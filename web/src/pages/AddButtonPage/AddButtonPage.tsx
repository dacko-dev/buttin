import { Metadata } from '@redwoodjs/web'

import ButtonForm from 'src/components/ButtonForm/ButtonForm'

const AddButtonPage = () => {
  return (
    <>
      <Metadata title="Create Button" description="AddButton page" />

      <div className="md:primary-gleam-hover md:rounded-base-big rounded-none border-base-700 bg-base-900 md:my-12 md:border">
        <div className="md:rounded-t-base-big flex items-center gap-4 rounded-none bg-base-950 p-8 px-12">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">Add Button</h1>
            <p className="font-light text-base-300">
              Create your own unique button with a custom message and share it
              with the world.
            </p>
          </div>
        </div>
        <ButtonForm />
      </div>
    </>
  )
}

export default AddButtonPage
