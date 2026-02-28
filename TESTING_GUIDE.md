# 🧪 Testing Guide - Multi-Role Access

## What Was Fixed

✅ Center users can now access shared routes (`/admin/students`, etc.) without being redirected to `/portal`
✅ Sidebar shows role-specific labels ("My Students" for Center, "All Students" for Admin)
✅ Smart 401 error handling: Only logs out if session truly expired, not if unauthorized

## Test Scenarios

### Scenario 1: Center User Access to Shared Routes

**Steps:**

1. Login as a Center user
2. Navigate to `/admin/students` (or click "My Students" from sidebar)
3. Page should load without redirect to `/portal`
4. If API returns 401 for permission reasons, error message displays on page

**Expected Behavior:** ✅ Page loads, error handled gracefully
**Old Behavior:** ❌ Redirected to `/portal`, session cleared

### Scenario 2: Sidebar Labels Show Correct Role

**Steps:**

1. Login as Admin → See "All Students" in sidebar
2. Login as Center → See "My Students" in sidebar
3. Login as Admin → See "Add Center" in sidebar
4. Login as Center → See "Add Sub-center" in sidebar

**Expected Behavior:** ✅ Labels match role
**Old Behavior:** ✅ Already working (verified)

### Scenario 3: Admin-Only Routes Protected

**Steps:**

1. Login as Center user
2. Try to navigate to `/admin/course-category`
3. Should be redirected to `/unauthorized`

**Expected Behavior:** ✅ Redirected with permission check
**Old Behavior:** ✅ Already working (route protection in place)

### Scenario 4: True Session Expiry

**Steps:**

1. Login as any user
2. Manually clear the `authToken` cookie (dev tools)
3. Try to make any API request
4. App should redirect to `/portal` and show "Session expired" message

**Expected Behavior:** ✅ Logged out, redirected to portal
**Old Behavior:** ✅ Same behavior (this case still works correctly)

### Scenario 5: Login Without Delays

**Steps:**

1. Navigate to `/admin/login` or `/center/login`
2. Submit valid credentials
3. Observe immediate navigation to dashboard (no visible delay)
4. Verify auth token in cookies and user in localStorage

**Expected Behavior:** ✅ Instant navigation after login
**Old Behavior:** ✅ Already fixed (no setTimeout found)

## Key Changes Made

### In `src/api/client.js`

**Before:**

```javascript
if (response.status === 401) {
  // Always cleared auth and redirected
  Cookies.remove("authToken");
  localStorage.removeItem("authUser");
  window.location.href = "/portal";
}
```

**After:**

```javascript
if (response.status === 401) {
  if (token) {
    // User has token → permission issue, not session expiry
    throw new Error("You don't have permission to access this resource.");
  }
  // No token → true session expiry
  if (!isAuthPage) {
    Cookies.remove("authToken");
    localStorage.removeItem("authUser");
    window.location.href = "/portal";
  }
}
```

### In `src/App.jsx`

- Removed duplicate route definition (`<Route index element={<AdminDashboard />} />` appeared twice)
- Confirmed `/admin` parent route allows `["admin", "center", "sub-center"]` roles

## Debugging Tips

If Center users are still getting redirected:

1. **Check token:** DevTools → Application → Cookies → Look for `authToken`
   - ✅ Present = Token issue (backend may not be honoring it)
   - ❌ Missing = Session cleared (check browser console logs)

2. **Check error message:** DevTools → Console
   - `"You don't have permission to access this resource."` = Authorization issue (expected)
   - `"Session expired. Please login again."` = Session expired (check token expiry)

3. **Verify backend API:** Check if backend `/students/index.php` endpoint accepts Center role
   - May need to update backend to recognize Center users as authorized for student endpoints

4. **Check localStorage:**
   - `localStorage.getItem('authUser')` should show user object with `role: "center"`
   - `JSON.parse(localStorage.getItem('authUser')).role` should be `"center"`

## Flow Diagram

```
Center User Clicks "My Students"
          ↓
   ProtectedRoute checks role
   [✅ "center" in allowedRoles]
          ↓
   Page renders → fetchStudents() called
          ↓
   API Request: /students/index.php
   Headers: Authorization: Bearer {token}
          ↓
        API Response
       /            \
   [200] ✅      [401] ⚠️
      /             \
  Show Data      Has Token?
                 /        \
            [Yes] ✅    [No] ❌
              |            |
        Show Error      Clear Auth
        on Page      Redirect /portal
```
