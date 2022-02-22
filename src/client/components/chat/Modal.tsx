import { useEffect } from 'react'
import styles from './styles/Modal.module.scss';

interface ModalProps {
  visible: boolean,
  image: string,
  onClose: () => void
}

export default function Modal({ visible, image, onClose }: ModalProps) {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose()
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

  if (!visible) return null

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <img className={styles.img} src={image} />
        <div className={styles.closeModal} onClick={onClose}>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

// const App = () => {
//   const [isModal, setModal] = React.useState(false)
//   const onClose = () => setModal(false)
//   return (
//     <React.Fragment>
//       <button onClick={() => setModal(true)}>Клик-клик-клик</button>
//       <Modal
//         visible={isModal}
//         title='Заголовок'
//         content={<p>Что-то важное</p>}
//         footer={<button onClick={onClose}>Закрыть</button>}
//         onClose={onClose}
//       />
//     </React.Fragment>
//   )
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// )