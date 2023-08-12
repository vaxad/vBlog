import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { BlogPost } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteBlog } from '@/lib/blog'

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props={
    active:boolean
}

type Prop = {
    blog:BlogPost
}

export default function Dropdown({blog}:Prop) {
  const route=useRouter()

  const handleDelete = async() =>{
    const res =await deleteBlog(blog._id)
    if(res){
      route.back()
    }else{
      alert('something went wrong')
    }
  }

  function handleShare() {
    const link=window.location.origin+'/viewBlogs/'+blog._id
    // //(link)
    navigator.clipboard.writeText(link);
  
    // Alert the copied text
    alert("Copied the text: " + link);
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          
          <ChevronDownIcon className=" h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
          <Menu.Item>
              {({ active }:Props) => (
                <div
                  onClick={()=>{handleShare()}}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Share
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }:Props) => (
                <Link
                href={`/edit/${blog._id}`}
                //  onClick={()=>{route.push(`edit/${blog._id}`)}} 
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Edit
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }:Props) => (
                <div
                  onClick={()=>{handleDelete()}}
                  className={classNames(
                    active ? 'bg-gray-100 text-red-700' : 'text-red-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Delete
                </div>
              )}
            </Menu.Item>
            
        
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
