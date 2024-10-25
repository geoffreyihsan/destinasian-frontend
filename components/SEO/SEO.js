import Head from 'next/head'
import { GetFavicon } from '../../queries/GetFavicon'
import { useQuery } from '@apollo/client'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { PageViewsCounter } from '../../components'
import { useEffect, useState } from 'react'

/**
 * Provide SEO related meta tags to a page.
 *
 * @param {Props} props The props object.
 * @param {string} props.title Used for the page title, og:title, twitter:title, etc.
 * @param {string} props.description Used for the meta description, og:description, twitter:description, etc.
 * @param {string} props.imageUrl Used for the og:image and twitter:image. NOTE: Must be an absolute url.
 * @param {string} props.url Used for the og:url and twitter:url.
 *
 * @returns {React.ReactElement} The SEO component
 */
export default function SEO({ title, description, imageUrl, url, focuskw }) {
  const { data } = useQuery(GetFavicon, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  const [gtmLoaded, setGtmLoaded] = useState(false)

  useEffect(() => {
    const checkGtmLoaded = () => {
      if (
        window.dataLayer &&
        window.dataLayer.some((e) => e.event === 'gtm.js')
      ) {
        setGtmLoaded(true)
      }
    }

    checkGtmLoaded()
    window.addEventListener('message', checkGtmLoaded) // Example: monitor GTM messages

    return () => {
      window.removeEventListener('message', checkGtmLoaded)
    }
  }, [])

  const favicon = data?.favicon?.mediaDetails?.sizes

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />

        {title && (
          <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta itemProp="name" content={title} />
            <meta property="og:title" content={title} />
            <meta property="twitter:title" content={title} />
          </>
        )}

        {description && (
          <>
            <meta name="description" content={description} />
            <meta itemProp="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="twitter:description" content={description} />
          </>
        )}

        {imageUrl && (
          <>
            <meta itemProp="image" content={imageUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="twitter:image" content={imageUrl} />
          </>
        )}

        {url && (
          <>
            <meta property="og:url" content={'https://destinasian.com' + url} />
            <meta
              property="twitter:url"
              content={'https://destinasian.com' + url}
            />
          </>
        )}

        {focuskw && <meta name="keywords" content={focuskw} />}

        {/* Favicon */}
        {favicon?.length > 0 &&
          favicon.map(({ width, sourceUrl }) => {
            if (width === '180') {
              return (
                <link
                  key={`fav-${width}x${width}`}
                  rel="apple-touch-icon"
                  href={sourceUrl}
                  sizes={`${width}x${width}`}
                />
              )
            }
            return (
              <link
                key={`fav-${width}x${width}`}
                rel="icon"
                type="image/png"
                sizes={`${width}x${width}`}
                href={sourceUrl}
              />
            )
          })}

        {/* SEM Keywords */}
        <meta
          name="keywords"
          content="travel magazine, luxury magazine, luxury travel magazine, travel news, travel reviews, luxury travel, hotel and airline booking, hotel reviews, airline news, travel video guides, travel deals, travel contest, travel website, online travel magazine, asia travel, philippines travel, hotel news, best hotels manila, hong kong restaurants, beach holidays, thailand travel, singapore restaurants, luxury train trips, luxury resorts, best hotels beijing, best hotels singapore, luxury holidays asia, japan travel, indonesia travel, southeast asia travel, cultural travel, asia travel magazine, india travel, island getaways, asia cruise, phuket resorts, bali resorts, bangkok restaurants, airline news, adventure travel asia, airline routes, best hotels hong kong, best hotels jakarta, luxe list, luxury travel asia, hong kong travel, bali travel, sri lanka travel, cambodia travel, luxury hotels, best hotels shanghai, vietnam travel, tokyo restaurants, singapore travel, china travel, maldives resorts, luxury cruise, best hotels southeast asia, best hotels tokyo"
        />

        {/* Typography Cloud */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cloud.typography.com/7429004/7933832/css/fonts.css"
        />
      </Head>
      {/* Google Tag Manager */}
      <GoogleTagManager gtmId="GTM-5BJVGS" />

      <GoogleAnalytics gaId="G-HP4Y1L0H6B" />

      {/* Google Tag Manager (noscript) */}
      {/* <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5BJVGS"
          height="0"
          width="0"
          className="invisible hidden"
        ></iframe>
      </noscript> */}
      {/* End Google Tag Manager (noscript) */}

      {gtmLoaded ? <PageViewsCounter /> : null}
    </>
  )
}
