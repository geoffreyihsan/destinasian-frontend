import { gql, useQuery } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  SingleHeader,
  Footer,
  Main,
  SingleContestEntryHeader,
  FeaturedImage,
  SEO,
  SingleSlider,
  SingleContestContainer,
  ContentWrapperContest,
} from '../components'
import { GetMenus } from '../queries/GetMenus'
import { GetFooterMenus } from '../queries/GetFooterMenus'
import { GetLatestStories } from '../queries/GetLatestStories'
import { eb_garamond, rubik_mono_one } from '../styles/fonts/fonts'

export default function SingleContest(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings
  const { title, content, featuredImage, acfPostSlider, seo, uri } =
    props?.data?.contest

  // Get menus
  const { data: menusData, loading: menusLoading } = useQuery(GetMenus, {
    variables: {
      first: 20,
      headerLocation: MENUS.PRIMARY_LOCATION,
      secondHeaderLocation: MENUS.SECONDARY_LOCATION,
      thirdHeaderLocation: MENUS.THIRD_LOCATION,
      fourthHeaderLocation: MENUS.FOURTH_LOCATION,
      fifthHeaderLocation: MENUS.FIFTH_LOCATION,
      featureHeaderLocation: MENUS.FEATURE_LOCATION,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  // Header Menu
  const primaryMenu = menusData?.headerMenuItems?.nodes ?? []
  const secondaryMenu = menusData?.secondHeaderMenuItems?.nodes ?? []
  const thirdMenu = menusData?.thirdHeaderMenuItems?.nodes ?? []
  const fourthMenu = menusData?.fourthHeaderMenuItems?.nodes ?? []
  const fifthMenu = menusData?.fifthHeaderMenuItems?.nodes ?? []
  const featureMenu = menusData?.featureHeaderMenuItems?.nodes ?? []

  // Get Footer menus
  const { data: footerMenusData, loading: footerMenusLoading } = useQuery(
    GetFooterMenus,
    {
      variables: {
        first: 50,
        footerHeaderLocation: MENUS.FOOTER_LOCATION,
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    },
  )

  // Footer Menu
  const footerMenu = footerMenusData?.footerHeaderMenuItems?.nodes ?? []

  // Get latest travel stories
  const { data: latestStories, loading: latestLoading } = useQuery(
    GetLatestStories,
    {
      variables: {
        first: 5,
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    },
  )

  const posts = latestStories?.posts ?? []
  const editorials = latestStories?.editorials ?? []
  const updates = latestStories?.updates ?? []

  const mainPosts = []
  const mainEditorialPosts = []
  const mainUpdatesPosts = []

  // loop through all the main categories posts
  posts?.edges?.forEach((post) => {
    mainPosts.push(post.node)
  })

  // loop through all the main categories and their posts
  editorials?.edges?.forEach((post) => {
    mainEditorialPosts.push(post.node)
  })

  // loop through all the main categories and their posts
  updates?.edges?.forEach((post) => {
    mainUpdatesPosts.push(post.node)
  })

  // sort posts by date
  const sortPostsByDate = (a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA // Sort in descending order
  }

  // define mainCatPostCards
  const mainCatPosts = [
    ...(mainPosts != null ? mainPosts : []),
    ...(mainEditorialPosts != null ? mainEditorialPosts : []),
    ...(mainUpdatesPosts != null ? mainUpdatesPosts : []),
  ]

  // sortByDate mainCat & childCat Posts
  const allPosts = mainCatPosts.sort(sortPostsByDate)

  const images = [
    [
      acfPostSlider?.slide1 != null
        ? acfPostSlider?.slide1?.mediaItemUrl
        : null,
      acfPostSlider?.slideCaption1 != null
        ? acfPostSlider?.slideCaption1
        : null,
    ],
    [
      acfPostSlider?.slide2 != null
        ? acfPostSlider?.slide2?.mediaItemUrl
        : null,
      acfPostSlider?.slideCaption2 != null
        ? acfPostSlider?.slideCaption2
        : null,
    ],
    [
      acfPostSlider?.slide3 != null
        ? acfPostSlider?.slide3?.mediaItemUrl
        : null,
      acfPostSlider?.slideCaption3 != null
        ? acfPostSlider?.slideCaption3
        : null,
    ],
    [
      acfPostSlider?.slide4 != null
        ? acfPostSlider?.slide4?.mediaItemUrl
        : null,
      acfPostSlider?.slideCaption4 != null
        ? acfPostSlider?.slideCaption4
        : null,
    ],
    [
      acfPostSlider?.slide5 != null
        ? acfPostSlider?.slide5?.mediaItemUrl
        : null,
      acfPostSlider?.slideCaption5 != null
        ? acfPostSlider?.slideCaption5
        : null,
    ],
  ]

  return (
    <main className={`${eb_garamond.variable} ${rubik_mono_one.variable}`}>
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={featuredImage?.node?.sourceUrl}
        url={uri}
        focuskw={seo?.focuskw}
      />
      <SingleHeader
        title={siteTitle}
        description={siteDescription}
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
        fourthMenuItems={fourthMenu}
        fifthMenuItems={fifthMenu}
        featureMenuItems={featureMenu}
        latestStories={allPosts}
        menusLoading={menusLoading}
        latestLoading={latestLoading}
      />
      <Main>
        <>
          <SingleContestContainer>
            <SingleSlider images={images} />
            <SingleContestEntryHeader title={title} />
            <ContentWrapperContest content={content} />
          </SingleContestContainer>
        </>
      </Main>
      <Footer footerMenu={footerMenu} />
    </main>
  )
}

SingleContest.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    contest(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      author {
        node {
          name
        }
      }
      seo {
        title
        metaDesc
        focuskw
      }
      uri
      acfPostSlider {
        slide1 {
          mediaItemUrl
        }
        slide2 {
          mediaItemUrl
        }
        slide3 {
          mediaItemUrl
        }
        slide4 {
          mediaItemUrl
        }
        slide5 {
          mediaItemUrl
        }
      }
      ...FeaturedImageFragment
    }
    generalSettings {
      ...BlogInfoFragment
    }
  }
`

SingleContest.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}
