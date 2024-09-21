"use client"
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'

const EducationCreate = () => {
  return (
    <DefaultLayout>
        <div className='min-h-[calc(100vh-80px)]'>
            <div className="grid max-w-[36rem] mx-auto">
                <div className="flex flex-col gap-9">
                {/* <!-- Input Fields --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Add Education
                    </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                    <div className="mb-3 block text-sm   font-medium text-black dark:text-white">
                        Paasing Year
                    </div>
                    <div className='flex gap-5'>
                        <div className='w-1/2'>
                            <input
                            type="text"
                            id='from'
                            name='from'
                            placeholder="From (optional)"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className='w-1/2'>
                            <input
                            type="text"
                            id='to'                    
                            name='to'
                            placeholder="To"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>
                    </div>
                    <div>
                        <label htmlFor='type' className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Education Type/Subject
                        </label>
                        <input
                        type="text"
                        id='type'
                        name='type'
                        placeholder="Bachelor of Science"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor='institute' className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Institute
                        </label>
                        <input
                        type="text"
                        id='institute'
                        name='institute'
                        placeholder="University of Oxford"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor='instituteLocation' className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Institute Location
                        </label>
                        <input
                        type="text"
                        id='instituteLocation'
                        name='instituteLocation'
                        placeholder="England, OX1 2JD, United Kingdom"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor='course' className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Course/Group Name
                        </label>
                        <input
                        type="text"
                        id='course'
                        name='course'
                        placeholder="Computer Science and Engineering"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                    <div className="mb-3 block text-sm   font-medium text-black dark:text-white">
                        Grade
                    </div>
                    <div className='flex gap-5'>
                        <div className='w-1/2'>
                            <input
                            type="text"
                            id='point'
                            name='point'
                            placeholder="Point"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className='w-1/2'>
                            <input
                            type="text"
                            id='outOf'                    
                            name='outOf'
                            placeholder="Out of"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
  )
}

export default EducationCreate