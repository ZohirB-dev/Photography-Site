import React, { useRef, useEffect } from 'react';
import '../App.css';

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
        <div className='bg-gray-100 border px-4 py-28 fixed h-screen flex flex-col items-start space-y-2 w-48'>
        <h1 className='font-bold'>Photos</h1>
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
    );
};

export default CategoryMenu;
