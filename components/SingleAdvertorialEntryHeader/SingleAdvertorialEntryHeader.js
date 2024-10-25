import className from 'classnames/bind'
import { Heading } from '../../components'
import styles from './SingleAdvertorialEntryHeader.module.scss'  

let cx = className.bind(styles)

export default function SingleAdvertorialEntryHeader({
  title,
  label,
  luxuryClass
}) {

  return (
    <div className={cx('component', className, luxuryClass)}>
      <div className={cx('header-wrapper')}>
      <Heading className={cx('sponsored')}>
          {label}
        </Heading>
        <Heading className={cx('title')}>
          {title}
        </Heading>
      </div>
    </div>
  )
}
