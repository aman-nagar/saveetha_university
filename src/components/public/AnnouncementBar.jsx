import { Banner, BannerCollapseButton } from "flowbite-react";
import { HiArrowRight, HiX } from "react-icons/hi";
import { MdPercent } from "react-icons/md";
import { usePublicContent } from "@/hooks/usePublicContent";

/**
 * AnnouncementBar Component
 * Displays scrolling announcements/promotions
 * Uses announcements data from PublicContentContext
 */
export default function AnnouncementBar() {
  const { announcements } = usePublicContent();

  // Default announcement if no data available
  const defaultAnnouncements = [
    {
      id: 1,
      title: "Get 5% commission per sale",
      link: "https://example.com",
      linkText: "Become a partner",
    },
  ];

  const announcementList =
    announcements?.length > 0 ? announcements : defaultAnnouncements;
  const current = announcementList[0];

  if (!current) return null;

  return (
    <Banner>
      <div className="flex w-full justify-between border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto flex items-center">
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 p-1 dark:bg-gray-600">
              <MdPercent className="h-4 w-4" />
            </span>
            <span className="[&_p]:inline">
              {current.title}&nbsp;
              {current.link && current.linkText && (
                <a
                  href={current.link || "#"}
                  className="ml-0 flex items-center text-sm font-medium text-cyan-600 hover:underline md:ml-1 md:inline-flex dark:text-cyan-500"
                >
                  {current.linkText}
                  <HiArrowRight className="ml-2" />
                </a>
              )}
            </span>
          </p>
        </div>
        <BannerCollapseButton
          color="gray"
          className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
        >
          <HiX className="h-4 w-4" />
        </BannerCollapseButton>
      </div>
    </Banner>
  );
}
