import React, { useRef, useEffect } from 'react';
import '../App.css';
import MyDropzone from './DropOff';

const CategoryMenu = ({ categories, activeCategory, onSelectCategory }) => {
    const submenuRef = useRef(null);

    const handleScroll = () => {
        if (submenuRef.current) {
            const submenuWidth = submenuRef.current.clientWidth;
            const submenuScrollWidth = submenuRef.current.scrollWidth;
            if (submenuScrollWidth > submenuWidth) {
                submenuRef.current.scrollLeft = submenuScrollWidth - submenuWidth;
            } else {
                submenuRef.current.scrollLeft = 0; // Reset scroll to the start
            }
        }
    };

    useEffect(() => {
        handleScroll();
    }, []);

    

    return (
        <div className='bg-gray-100 border px-4 py-28 fixed h-screen flex flex-col justify-between space-y-2 w-48'>
        <div>
            <h1 className='font-bold text-left mb-2'>Locations</h1>
                <div className='space-y-2' ref={submenuRef} id='id'>
                    {categories.map((category, index) => (
                        <button
                            key={category}
                            onClick={() => onSelectCategory(category, index)}
                            className= {`${category === activeCategory ? "bg-gray-300/50" : ""} hover:bg-gray-300/50 text-sm py-1 px-2 text-left w-full rounded-md` }>
                            {category}
                        </button>
                    ))}
                </div>
        </div>
            <MyDropzone className='text-gray-300 border-dashed border-2 border-gray-300 rounded-xl cursor-pointer p-6 flex justify-center items-center mt-auto'/>
        </div>
    );
};

export default CategoryMenu;
