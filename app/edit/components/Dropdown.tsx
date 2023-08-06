import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { BlogPost } from '@/types'
import Link from 'next/link'
import { deleteBlog } from '@/lib/blog'
import { useRouter } from 'next/navigation'

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props={
    active:boolean
}

type Prop = {
    blogId:string
}

export default function Dropdown({blogId}:Prop) {
  const route=useRouter()

  const handleDelete = async() =>{
    const res =await deleteBlog(blogId)
    if(res){
      route.back()
    }else{
      alert('something went wrong')
    }
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <main>
        <Menu.Button className="w-full  justify-center items-center flex">
          
        <button className="text-white block border border-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-transparent dark:hover:bg-red-700 dark:focus:ring-red-800">Delete vBlog</button>
  
        </Menu.Button>
      </main>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0  z-10 mt-2 w-56 origin-bottom-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1"
          onClick={()=>{
            handleDelete()
          }}>
            <Menu.Item>
              {({ active }:Props) => (
                <div
                  className={classNames(
                    active ? 'bg-gray-100 text-red-700' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Confirm delete
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }:Props) => (
                <div
                  
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Cancel
                </div>
              )}
            </Menu.Item>
        
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
