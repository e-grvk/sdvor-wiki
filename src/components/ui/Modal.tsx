'use client'

import { Dialog } from '@headlessui/react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-30 z-50" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          {title && <Dialog.Title className="text-xl font-semibold">{title}</Dialog.Title>}
          <div className="mt-4">{children}</div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Закрыть
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
