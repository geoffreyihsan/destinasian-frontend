import classNames from 'classnames/bind'
import styles from './ParentNavigation.module.scss'
import { DaGuideMenu, TravelGuidesMenu } from '../../../components'
import { useQuery } from '@apollo/client'
import { GetParentNavigation } from '../../../queries/GetParentNavigation'
import Link from 'next/link'

let cx = classNames.bind(styles)

export default function ParentNavigation({
  databaseId,
  isNavShown,
  setIsNavShown,
  isScrolled,
}) {
  const catPerPage = 4

  let catVariable = {
    first: catPerPage,
    id: databaseId,
  }

  // Get Category
  const { data } = useQuery(GetParentNavigation, {
    variables: catVariable,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  return (
    <div className={cx('component', isNavShown ? 'show' : undefined)}>
      <div className={cx('navbar-wrapper', isNavShown ? 'show' : undefined)}>
        {/* {'parent'} */}
        <div className={cx('da-guide-wrapper')}>
          {data?.category?.destinationGuides?.destinationGuides == 'yes' && (
            <DaGuideMenu
              title={data?.category?.countryCode?.countryCode}
              titleName={data?.category?.name}
              titleUri={data?.category?.uri}
            />
          )}
          {data?.category?.destinationGuides?.destinationGuides == null && null}
        </div>

        {/* <div className={cx('navigation-wrapper')}>
        {data?.category?.children?.edges?.map((post) => (
          <li key={post?.node?.uri} className={cx('nav-link')}>
            {post?.node?.uri && (
              <Link
                href={post?.node?.uri}
                className={cx(isActive(post?.node?.uri) ? 'active' : '')}
              >
                <h2 className={cx('nav-name')}>{post?.node?.name}</h2>
              </Link>
            )}
          </li>
        ))}
      </div> */}

        {!isNavShown ? (
          <>
            {!isScrolled && (
              <div className={cx('text-menu-wrapper')}>
                {/* Menu Button */}
                {isNavShown == false ? (
                  <div className={cx('menu-button')}>
                    {/* menu button */}
                    <button
                      type="button"
                      className={cx('menu-icon')}
                      onClick={() => {
                        setIsNavShown(!isNavShown)
                      }}
                      aria-label="Toggle navigation"
                      aria-controls={cx('full-menu-wrapper')}
                      aria-expanded={!isNavShown}
                    >
                      {'All Guides'}
                    </button>
                  </div>
                ) : (
                  <div className={cx('menu-button')}>
                    {/* close button */}
                    <button
                      type="button"
                      className={cx('close-icon')}
                      onClick={() => {
                        setIsNavShown(!isNavShown)
                      }}
                      aria-label="Toggle navigation"
                      aria-controls={cx('full-menu-wrapper')}
                      aria-expanded={!isNavShown}
                    >
                      <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="512.000000pt"
                        height="512.000000pt"
                        viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g
                          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                          fill="#000000"
                          stroke="none"
                        >
                          <path
                            d="M2330 5109 c-305 -29 -646 -126 -910 -259 -273 -138 -559 -356 -755
-576 -384 -432 -602 -931 -655 -1499 -41 -446 55 -949 260 -1355 138 -273 356
-559 576 -755 432 -384 931 -602 1499 -655 446 -41 949 55 1355 260 273 138
559 356 755 576 384 432 602 931 655 1499 41 446 -55 949 -260 1355 -138 273
-356 559 -576 755 -432 384 -931 602 -1499 655 -125 11 -320 11 -445 -1z
m-193 -1701 l423 -423 425 425 425 425 212 -213 213 -212 -425 -425 -425 -425
425 -425 425 -425 -213 -212 -212 -213 -425 425 -425 425 -425 -425 -425 -425
-212 213 -213 212 425 425 425 425 -425 425 -425 425 210 210 c115 115 212
210 215 210 3 0 195 -190 427 -422z"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}
            {isScrolled && (
              <div className={cx('sticky-text-menu-wrapper')}>
                {/* Menu Button */}
                {isNavShown == false ? (
                  <div className={cx('menu-button')}>
                    {/* menu button */}
                    <button
                      type="button"
                      className={cx('menu-icon')}
                      onClick={() => {
                        setIsNavShown(!isNavShown)
                      }}
                      aria-label="Toggle navigation"
                      aria-controls={cx('full-menu-wrapper')}
                      aria-expanded={!isNavShown}
                    >
                      {'All Guides'}
                    </button>
                  </div>
                ) : (
                  <div className={cx('menu-button')}>
                    {/* close button */}
                    <button
                      type="button"
                      className={cx('close-icon')}
                      onClick={() => {
                        setIsNavShown(!isNavShown)
                      }}
                      aria-label="Toggle navigation"
                      aria-controls={cx('full-menu-wrapper')}
                      aria-expanded={!isNavShown}
                    >
                      <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="512.000000pt"
                        height="512.000000pt"
                        viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g
                          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                          fill="#000000"
                          stroke="none"
                        >
                          <path
                            d="M2330 5109 c-305 -29 -646 -126 -910 -259 -273 -138 -559 -356 -755
-576 -384 -432 -602 -931 -655 -1499 -41 -446 55 -949 260 -1355 138 -273 356
-559 576 -755 432 -384 931 -602 1499 -655 446 -41 949 55 1355 260 273 138
559 356 755 576 384 432 602 931 655 1499 41 446 -55 949 -260 1355 -138 273
-356 559 -576 755 -432 384 -931 602 -1499 655 -125 11 -320 11 -445 -1z
m-193 -1701 l423 -423 425 425 425 425 212 -213 213 -212 -425 -425 -425 -425
425 -425 425 -425 -213 -212 -212 -213 -425 425 -425 425 -425 -425 -425 -425
-212 213 -213 212 425 425 425 425 -425 425 -425 425 210 210 c115 115 212
210 215 210 3 0 195 -190 427 -422z"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className={cx('image-menu-wrapper')}>
            <div className={cx('close-button')}>
              {/* close button */}
              <button
                type="button"
                className={cx('close-icon')}
                onClick={() => {
                  setIsNavShown(!isNavShown)
                }}
                aria-label="Toggle navigation"
                aria-controls={cx('primary-navigation')}
                aria-expanded={!isNavShown}
              >
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="512.000000pt"
                  height="512.000000pt"
                  viewBox="0 0 512.000000 512.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M2330 5109 c-305 -29 -646 -126 -910 -259 -273 -138 -559 -356 -755
-576 -384 -432 -602 -931 -655 -1499 -41 -446 55 -949 260 -1355 138 -273 356
-559 576 -755 432 -384 931 -602 1499 -655 446 -41 949 55 1355 260 273 138
559 356 755 576 384 432 602 931 655 1499 41 446 -55 949 -260 1355 -138 273
-356 559 -576 755 -432 384 -931 602 -1499 655 -125 11 -320 11 -445 -1z
m-193 -1701 l423 -423 425 425 425 425 212 -213 213 -212 -425 -425 -425 -425
425 -425 425 -425 -213 -212 -212 -213 -425 425 -425 425 -425 -425 -425 -425
-212 213 -213 212 425 425 425 425 -425 425 -425 425 210 210 c115 115 212
210 215 210 3 0 195 -190 427 -422z"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        )}

        <div
          className={cx(['full-menu-wrapper', isNavShown ? 'show' : undefined])}
        >
          <TravelGuidesMenu />
        </div>
      </div>
    </div>
  )
}
