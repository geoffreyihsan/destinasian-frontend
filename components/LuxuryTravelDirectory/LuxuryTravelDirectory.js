import className from 'classnames/bind'
import styles from './LuxuryTravelDirectory.module.scss'
import { useEffect, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Image from 'next/image'

let cx = className.bind(styles)

export default function LuxuryTravelDirectory({ content, parent, children }) {
  const [transformedContent, setTransformedContent] = useState('')

  if (!parent) {
    return null
  }

  useEffect(() => {
    // Function to extract image data and replace <img> with <Image>
    const extractImageData = () => {
      // Create a DOMParser
      const parser = new DOMParser()

      // Parse the HTML content
      const doc = parser.parseFromString(content, 'text/html')

      // Get only image elements with src containing "staging.destinasian.com"
      const imageElements = doc.querySelectorAll(
        'img[src*="staging.destinasian.com"]',
      )

      // Replace <img> elements with <Image> components
      imageElements.forEach((img) => {
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        const width = img.getAttribute('width')
        const height = img.getAttribute('height')

        // Create Image component
        const imageComponent = (
          <Image
            src={src}
            alt={alt}
            width={width ? width : '500'}
            height={height ? height : '500'}
            style={{ objectFit: 'contain' }}
            priority
          />
        )

        // Render the Image component to HTML string
        const imageHtmlString = renderToStaticMarkup(imageComponent)

        // Replace the <img> element with the Image HTML string in the HTML content
        img.outerHTML = imageHtmlString
      })

      // Set the transformed HTML content
      setTransformedContent(doc.body.innerHTML)
    }

    // Call the function to extract image data and replace <img>
    extractImageData()
  }, [content])

  return (
    <article className={cx('component')}>
      <div
        className={cx('content-wrapper')}
        dangerouslySetInnerHTML={{ __html: content ?? '' }}
      />
      {children}
    </article>
  )
}
