// components/modal.tsx
import { ReactNode } from 'react'
import { Transition } from '@headlessui/react'

interface ModalProps {
  children: ReactNode
  onClose: () => void
  isOpen: boolean
}

const Modal = ({ children, onClose, isOpen }: ModalProps) => {
  return (
    <Transition show={isOpen} as="div">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md w-96">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 font-bold text-xl"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </Transition>
  )
}

export default Modal
