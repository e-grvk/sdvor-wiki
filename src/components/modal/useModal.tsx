import { createContext, useCallback, useContext, useState } from 'react'
import { ReactNode } from 'react'
import { Modal } from '@/components/modal/Modal'

interface ModalContextType {
  showModal: (content: ReactNode, options?: { title?: string }) => void
  hideModal: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used within ModalProvider')
  return context
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null)
  const [title, setTitle] = useState<string | undefined>()
  const [isOpen, setIsOpen] = useState(false)

  const showModal = useCallback((content: ReactNode, options?: { title?: string }) => {
    setTitle(options?.title)
    setModalContent(content)
    setIsOpen(true)
  }, [])

  const hideModal = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      setModalContent(null)
      setTitle(undefined)
    }, 300) // for animation
  }, [])

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal isOpen={isOpen} onClose={hideModal} title={title}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  )
}
