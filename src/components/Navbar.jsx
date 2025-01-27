import { navLists } from "../constants";
import { appleImg, bagImg, searchImg } from "../utils";

export function Navbar(){
    return (
        <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
            <nav className="w-full flex screen-max-width">
                <img src={appleImg} alt="Apple" width={14} height={18} ></img>
                <ul className="flex flex-1 justify-center max-sm:hidden">
                    {navLists.map((listItem,index)=>{
                        return <li key={index} className="px-5 text-sm cursor-pointer hover:text-white transition-all text-gray">{listItem}</li>
                    })}
                </ul>
                <div className="flex max-sm:justify-end max-sm:flex-1 items-baseline  gap-7">
                    <img src={searchImg} alt="search" width={18} height={18}/>
                    <img src={bagImg} alt="search" width={18} height={18}/>
                </div>
            </nav>
        </header>
    )
}