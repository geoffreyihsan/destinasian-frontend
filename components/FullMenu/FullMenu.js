import classNames from 'classnames/bind'
import { NavigationMenu, SearchInput, SearchResults } from '../../components'
import styles from './FullMenu.module.scss'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

let cx = classNames.bind(styles)

export default function FullMenu({
  primaryMenuItems,
  secondaryMenuItems,
  thirdMenuItems,
  fourthMenuItems,
  fifthMenuItems,
  featureMenuItems,
  latestStories,
  clearSearch,
  searchQuery,
  setSearchQuery,
  menusLoading,
  latestLoading,
  contentNodesPosts,
  searchResultsLoading,
  searchResultsError,
  isSearchResultsVisible,
}) {
  // LatestStories content
  const [visiblePosts] = useState(3)

  // Loading Menu
  if (menusLoading || latestLoading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 h-[80vh] w-8 animate-spin fill-black text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={cx('component')}>
      {/* Full menu */}
      <div
        className={cx('full-menu-content', {
          searchVisible: isSearchResultsVisible,
        })}
      >
        {/* Search Bar */}
        <div className={cx('search-bar-wrapper')}>
          <div className={cx('search-input-wrapper')}>
            <SearchInput
              value={searchQuery}
              onChange={(newValue) => setSearchQuery(newValue)}
              clearSearch={clearSearch}
            />
          </div>
          <div className={cx('search-result-wrapper')}>
            {searchResultsError && (
              <div className={cx('alert-error')}>
                {'An error has occurred. Please refresh and try again.'}
              </div>
            )}

            {/* Conditionally render the SearchResults component */}
            {isSearchResultsVisible && (
              <SearchResults
                searchResults={contentNodesPosts}
                isLoading={searchResultsLoading}
              />
            )}
          </div>
        </div>
        <div className={cx('menu-wrapper')}>
          <div className={cx('first-wrapper')}>
            {/* Secondary Menu {Destinations Menu} */}
            <NavigationMenu
              className={cx('secondary-navigation')}
              menuItems={secondaryMenuItems}
            />
          </div>
          <div className={cx('second-wrapper')}>
            {/* Primary Menu {Destination Guides Menu} */}
            <NavigationMenu
              className={cx('primary-navigation')}
              menuItems={primaryMenuItems}
            />
          </div>
          <div className={cx('third-wrapper')}>
            {/* Feature Stories & Latest Travel Stories */}
            <nav className={cx('feature-stories')}>
              <NavigationMenu
                className={cx('feature-navigation')}
                menuItems={featureMenuItems}
              />
            </nav>
            {latestStories.length !== 0 && (
              <nav className={cx('latest-stories')}>
                <ul className={cx('menu-name')}>{'Latest Travel Stories'}</ul>
                <ul className={cx('menu-content')}>
                  {latestStories.slice(0, visiblePosts).map((post) => (
                    <li key={post?.id}>
                      {post?.uri && (
                        <Link href={post?.uri} className={cx('menu-item')}>
                          {post?.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <nav className={cx('feature-video')}>
              <ul className={cx('menu-name')}>
                {'Videos Produced By DestinAsian'}
              </ul>
              {featureMenuItems[0]?.menu?.node?.videosThumbnailMenu?.videosPage
                ?.url && (
                <Link
                  href={
                    featureMenuItems[0]?.menu?.node?.videosThumbnailMenu
                      ?.videosPage?.url
                  }
                >
                  <div className={cx('thumbnail-wrapper')}>
                    <Image
                      src={
                        featureMenuItems[0]?.menu?.node?.videosThumbnailMenu
                          ?.videosThumbnail?.sourceUrl
                      }
                      alt={
                        featureMenuItems[0]?.menu?.node?.videosThumbnailMenu
                          ?.videosThumbnail?.altText
                      }
                      width={
                        featureMenuItems[0]?.menu?.node?.videosThumbnailMenu
                          ?.videosThumbnail?.mediaDetails?.width
                          ? featureMenuItems[0]?.menu?.node?.videosThumbnailMenu
                              ?.videosThumbnail?.mediaDetails?.width
                          : '1280'
                      }
                      height={
                        featureMenuItems[0]?.menu?.node?.videosThumbnailMenu
                          ?.videosThumbnail?.mediaDetails?.height
                          ? featureMenuItems[0]?.menu?.node?.videosThumbnailMenu
                              ?.videosThumbnail?.mediaDetails?.height
                          : '720'
                      }
                      sizes="100%"
                      priority
                    />
                  </div>
                </Link>
              )}
            </nav>
          </div>
          <div className={cx('fourth-wrapper')}>
            <div className={cx('left-wrapper')}>
              {/* Third Menu {Static Pages Menu} */}
              <NavigationMenu
                className={cx(['third-navigation'])}
                menuItems={thirdMenuItems}
              />
              {/* Fourth Menu {Newsletters Menu} */}
              <NavigationMenu
                className={cx(['fourth-navigation'])}
                menuItems={fourthMenuItems}
              />
            </div>
            <div className={cx('right-wrapper')}>
              {/* Fifth Menu {Print Magazine Menu} */}
              <NavigationMenu
                className={cx(['fifth-navigation'])}
                menuItems={fifthMenuItems}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
