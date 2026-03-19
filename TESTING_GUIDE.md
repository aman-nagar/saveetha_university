# CoursePage Cascade - Testing Guide

## 🧪 Quick Start Testing

### Test Environment

- URL: `http://localhost:5173/admin/courses`
- Dev Server: Running
- Build Status: ✓ Successful (9.93s, 0 errors)

---

## ✅ Test Case 1: Create Mode - Cascade Flow

### Steps:

1. **Navigate to Courses Page**
   - Go to `/admin/courses`
   - Verify page loads successfully
   - ✅ Course Type dropdown should be empty (no selection)
   - ✅ Faculty dropdown should be **disabled** (grayed out, opacity 70%)
   - ✅ Courses table should be empty

2. **Select Course Type**
   - Click on "Course Type" dropdown
   - Select any option (e.g., "Engineering")
   - ✅ Loading spinner appears next to "Faculty" label
   - ✅ Spinner shows rotating animation + "Loading..." text
   - ✅ Faculty dropdown remains **disabled** during loading

3. **Wait for Faculty Load**
   - After ~1-2 seconds, loading spinner disappears
   - ✅ Faculty dropdown becomes **enabled** (normal opacity)
   - ✅ Faculty dropdown is populated with filtered options (only faculties for selected type)
   - ✅ Dropdown shows options like "CSE", "ECE", "ME" (relevant to selected type)

4. **Select Faculty**
   - Click on "Faculty" dropdown
   - Select an option (e.g., "CSE")
   - ✅ Courses table starts loading (observe loading indicator)
   - ✅ After load completes, courses appear in table

5. **Verify Course Creation**
   - Fill in Course Name: "B.Tech Computer Science"
   - Fill in Duration: "4"
   - Select Duration Type: "Year"
   - ✅ Course Type dropdown shows correct selection
   - ✅ Faculty dropdown shows correct selection
   - Click "Create Course"
   - ✅ Success toast appears
   - ✅ Course appears in table with correct type/faculty

### Expected Result: ✅ PASS

- Cascade loads data lazily (no initial fetch)
- Loading indicators appear/disappear smoothly
- Faculty dropdown disables until course type selected
- Data relationships maintained

---

## ✅ Test Case 2: Edit Mode - Cascade Prepopulation

### Steps:

1. **Find a Course to Edit**
   - In Courses table, click the **Edit** (pencil) icon on any row
   - Example: Editing course from "Engineering" type with "CSE" faculty

2. **Verify Edit Modal Opens**
   - Modal opens with title "Edit Course"
   - ✅ Course Type dropdown shows the course's type (e.g., "Engineering")
   - ⏳ Faculty dropdown shows loading spinner + "Loading..."
   - ✅ Faculty dropdown is **disabled** during loading

3. **Wait for Faculty Cascade**
   - After ~1-2 seconds, spinner disappears
   - ✅ Faculty dropdown becomes **enabled**
   - ✅ Faculty dropdown shows courses of selected type
   - ✅ Faculty dropdown has the correct pre-filled value (e.g., "CSE")
   - ✅ All three fields show correct values:
     - Course Type: "Engineering"
     - Faculty: "CSE"
     - Course Name: Original name
     - Duration: Original duration
     - Duration Type: Original type

4. **Edit and Save**
   - Change Course Name to "B.Tech CSE - Updated"
   - Click "Update Course"
   - ✅ Success toast appears
   - ✅ Modal closes
   - ✅ Course list updates with new name

### Expected Result: ✅ PASS

- Edit mode automatically loads faculties for selected course type
- All dropdowns pre-fill with correct values
- No stale data or mismatched combinations

---

## ⚠️ Test Case 3: Change Course Type in Edit Mode

### Steps:

1. **Open Edit Modal**
   - Click edit on any course

2. **Change Course Type**
   - Click Course Type dropdown
   - Select a **different** type (e.g., if currently "Engineering", select "Management")
   - ✅ Loading spinner appears in Faculty dropdown
   - ✅ Faculty dropdown is **disabled**
   - ✅ Faculty selection clears (shows empty)
   - ✅ Courses table becomes empty

3. **Wait for New Faculties to Load**
   - Spinner animates for ~1-2 seconds
   - ✅ Loading spinner disappears
   - ✅ Faculty dropdown enables
   - ✅ Faculty dropdown shows faculties for NEW type (not previous)
   - ✅ No stale faculty options from previous type

4. **Select New Faculty**
   - Choose a faculty from new type
   - ✅ Courses table updates
   - Click "Update Course"
   - ✅ Success toast shows

### Expected Result: ✅ PASS

- Changing course type properly resets faculty and courses
- No mixing of data from previous type
- Cascade re-triggers correctly

---

## ❌ Test Case 4: Error Handling - No Course Type Selected

### Steps:

1. **Open Create Form**
   - Page fully loaded
   - Course Type dropdown empty

2. **Try to Select Faculty (Should Fail)**
   - Try clicking Faculty dropdown
   - ✅ Dropdown should be **disabled** (cannot click)
   - ✅ Opacity 70% indicates disabled state
   - ✅ Cursor changes to not-allowed

3. **Try to Submit Without Course Type**
   - Try clicking "Create Course" button without selections
   - ❌ Form validation should prevent submission
   - ✅ Error message: "Course type is required"

### Expected Result: ✅ PASS

- Dropdown prevents invalid selections by disabling
- Form validation catches missing fields
- No orphaned courses without type/faculty

---

## ❌ Test Case 5: Error Handling - API Failures

### Steps:

1. **Simulate API Error** (Optional - requires backend interaction)
   - In browser DevTools, block/throttle network
   - Select course type
   - ❌ Faculty fetch fails due to network

2. **Observe Error Handling**
   - ✅ Loading spinner appears then disappears
   - ✅ Error toast appears: "Failed to fetch faculties"
   - ✅ Faculty dropdown becomes empty
   - ✅ Faculty dropdown remains **disabled** (no orphaned selections)
   - ✅ User can retry by selecting course type again

### Expected Result: ✅ PASS

- Errors don't crash the form
- Finally block clears loading state
- User can recover and retry

---

## 📊 Test Case 6: Verify No Initial API Calls

### Steps:

1. **Open DevTools Network Tab**
   - F12 → Network tab
   - Filter by XHR/Fetch

2. **Navigate to Courses Page**
   - Go to `/admin/courses`
   - ✅ Should see ONLY ONE API call: `fetchCourseCategories()`
   - ❌ Should NOT see: `fetchAllFaculty()` or `fetchCourses()`
   - ❌ Should NOT see multiple calls on load

3. **Verify Lazy Loading**
   - Network tab shows initial call only
   - Select course type
   - ✅ NEW API call appears: `fetchFaculty(courseTypeId)`
   - Select faculty
   - ✅ NEW API call appears: `fetchCourses(facultyId)`

### Expected Result: ✅ PASS

- Only loads data when explicitly requested
- No unnecessary initial API calls
- Reduced bandwidth and faster page load

---

## 🎨 Test Case 7: Loading Indicator Visual Feedback

### Steps:

1. **Observe Spinner Appearance**
   - Select course type
   - Watch Faculty dropdown label
   - ✅ Spinner appears: small circular icon (w-3 h-3)
   - ✅ Color matches theme accent color (blue/primary)
   - ✅ Text "Loading..." appears next to spinner
   - ✅ Spinner animates smoothly (CSS rotate animation)

2. **Verify Spinner Position**
   - Spinner in header next to label (justify-between)
   - ✅ Label on left
   - ✅ Spinner on right
   - ✅ Clean alignment, no overflow

3. **Verify Spinner Disappears**
   - Faculty data loads
   - ✅ Spinner animation stops
   - ✅ Spinner element removed from DOM
   - ✅ Label returns to normal position

### Expected Result: ✅ PASS

- Spinner matches design system
- Clear visual indication of loading state
- Smooth appearance/disappearance

---

## 📱 Test Case 8: Responsive Design

### Steps:

1. **Test on Desktop (1920px)**
   - All dropdowns visible and functional
   - ✅ Course Type: 2 columns layout
   - ✅ Faculty: 2 columns layout
   - ✅ Spinner displays correctly

2. **Test on Tablet (768px)**
   - Resize browser to tablet width
   - ✅ Dropdowns stack properly
   - ✅ Labels responsive (`text-xs sm:text-sm`)
   - ✅ Spinner size adapts

3. **Test on Mobile (375px)**
   - Resize browser to mobile width
   - ✅ Form fully usable
   - ✅ Dropdowns clickable
   - ✅ Spinner still visible

### Expected Result: ✅ PASS

- Responsive classes work correctly
- No overflow or layout issues
- Touch-friendly dropdown sizes

---

## 🔒 Test Case 9: Admin API Authentication

### Steps:

1. **Verify API Endpoint Routing**
   - Open DevTools → Network tab
   - Select course type
   - Click on Faculty fetch request
   - ✅ Endpoint should be: `/course/index.php?type=faculty&course_type_id=X`
   - ✅ Request headers should include: `Authorization: Bearer [token]`
   - ✅ NOT using public API (`/public/courses.php`)

2. **Verify Auth Token Present**
   - In Network tab, check request headers
   - ✅ `Authorization` header exists
   - ✅ Token format: `Bearer [long_token_string]`
   - ✅ Response status: 200 (not 401)

### Expected Result: ✅ PASS

- Using admin APIs only (not public)
- Auth token properly injected
- Admin authentication maintained

---

## 🐛 Debugging Tips

### If spinner doesn't appear:

1. Check browser console for errors
2. Verify `loadingFaculties` state is true during fetch
3. Check FormSelect receives `isLoading={loadingFaculties}`

### If faculties don't load:

1. Check Network tab for API calls
2. Verify correct courseTypeId is being sent
3. Check backend API response (should return array of faculties)
4. Look for error toast on page

### If dropdown stays disabled:

1. Check selectedCourseType has value
2. Verify facultyList is not empty
3. Check loadingFaculties is false (not locked in true state)

### If pre-fill in edit mode fails:

1. Verify initialData object has course_type_id field
2. Check handleEditClick is being called (not old onClick)
3. Monitor Network tab for fetchFaculty call
4. Check faculty pre-fill value matches available options

---

## ✅ Complete Test Checklist

- [ ] Course types load on page mount
- [ ] Course Type dropdown populated
- [ ] Faculty dropdown disabled initially
- [ ] Select course type triggers faculty fetch
- [ ] Loading spinner appears in Faculty label
- [ ] Spinner disappears after load
- [ ] Faculty dropdown shows filtered options
- [ ] Faculty dropdown enabled after load
- [ ] Select faculty triggers course fetch
- [ ] Courses table populates
- [ ] Can create course with all relationships
- [ ] Edit button loads faculties for course type
- [ ] Edit modal pre-fills all three dropdowns
- [ ] Can change course type and cascade re-triggers
- [ ] Error handling works (no crashes)
- [ ] Loading state clears on error
- [ ] Spinner visual matches design
- [ ] Responsive on mobile/tablet/desktop
- [ ] Admin APIs used (not public)
- [ ] Auth token present in requests

---

**All tests should PASS ✅**

If any test fails, check the debugging tips above or review the implementation summary.
