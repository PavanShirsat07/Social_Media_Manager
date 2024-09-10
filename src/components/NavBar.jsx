import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css'; // Light weight
import '@fontsource/roboto/400.css'; // Regular weight
import '@fontsource/roboto/500.css'; // Medium weight
import '@fontsource/roboto/700.css'; // Bold weight

const NavBar = () => {
    return (
        <>

            <div className='flex justify-between text-black pt-5 pl-5 pr-5'>
                <div className='flex gap-10 mt-2 ml-3'>
                    <div>
                        <svg width="94" height="25" viewBox="0 0 74 19" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="buffer-logo">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 4.23717L8.03416 0L16.1549 4.23717L8.03416 8.48914L0 4.23717ZM48.2324 6.29724V6.19638C48.2324 4.79863 49.0398 4.35193 50.3998 4.4528V1.90229C47.1416 1.70055 45.5975 3.35766 45.5975 6.19638V6.29724H44.1242V8.84775H45.5975V16.5713H48.2324V8.84775H49.7904H50.3998H51.2637V16.5713H53.8986V8.84775H56.066V6.29724H53.8986V6.19638C53.8986 4.79863 54.6918 4.35193 56.066 4.4528V1.90229C52.8079 1.70055 51.2637 3.35766 51.2637 6.19638V6.29724H50.3998H49.7904H48.2324ZM29.8166 9.09245C30.6524 8.41523 31.1623 7.44975 31.1623 6.21054C31.1623 3.80411 29.2358 2.1614 26.8134 2.1614H21.1896V16.5423H27.2667C29.7457 16.5423 31.7289 14.8419 31.7289 12.3779C31.7006 10.8937 30.964 9.75529 29.8166 9.09245ZM26.8276 4.8272C27.7342 4.8272 28.3575 5.50446 28.3575 6.41227C28.3575 7.32007 27.7058 7.99735 26.8276 7.99735H24.0085V4.8272H26.8276ZM27.2526 13.9053H24.0085V10.519H27.2526C28.2159 10.519 28.9099 11.2395 28.9099 12.2049C28.9099 13.1848 28.2159 13.9053 27.2526 13.9053ZM39.9451 6.28238V11.8301C39.9451 13.617 38.9819 14.3807 37.6928 14.3807C36.5029 14.3807 35.667 13.6601 35.667 12.2624V6.28238H33.0322V12.5939C33.0322 15.3317 34.7179 16.8447 36.8995 16.8447C38.2736 16.8447 39.336 16.3259 39.931 15.4037V16.5565H42.5658V6.28238H39.9451ZM66.9877 12.5076H59.2818C59.6643 13.8622 60.7691 14.4385 62.1433 14.4385C63.1773 14.4385 63.9991 14.0063 64.4379 13.4155L66.563 14.6403C65.614 16.038 64.084 16.845 62.1147 16.845C58.6867 16.845 56.5194 14.4818 56.5194 11.4125C56.5194 8.34328 58.7008 5.98006 61.9167 5.98006C64.934 5.98006 67.0873 8.38647 67.0873 11.4125C67.0873 11.816 67.0445 12.1618 66.9877 12.5076ZM61.9167 8.38647C60.4997 8.38647 59.5367 9.15023 59.2391 10.4615H64.4519C64.1262 8.97726 63.0214 8.38647 61.9167 8.38647ZM70.8977 8.05523V6.28286H68.2629V16.557H70.8977V11.6432C70.8977 9.48178 72.6258 8.86218 74 9.03509V6.08108C72.7113 6.08108 71.422 6.6575 70.8977 8.05523ZM8.03416 15.7599L2.55304 12.7337L0 14.1388L8.03416 18.57L16.1549 14.1388L13.573 12.7337L8.03416 15.7599ZM2.55304 7.95856L8.03416 10.7029L13.573 7.95856L16.1549 9.23926L8.03416 13.2643L0 9.23926L2.55304 7.95856Z" fill="black"></path>
                        </svg>
                    </div>
                    <div>
                        <ul className='roboto font-extrabold text-gray-500 flex gap-10 text-xl '>
                            <li><Link to="/create">Create</Link></li>
                            <li><Link to="/Calender">Publish</Link></li> {/* Path should match the route in App.js */}
                            <li><Link to="/analyze">Analyze</Link></li>
                            <li><Link to="/engage">Engage</Link></li>
                            <li><Link to="/StartPage">Start Page</Link></li>
                        </ul>
                    </div>

                </div>
                <div className="flex gap-7">
                    <div className="roboto font-extrabold text-gray-500 text-xl mt-2 text-blue-600">
                        <Link>Invite Your Team</Link>
                    </div>
                    <div className="bg-blue-600 text-white font-bold rounded-md mb-10 flex ">
                        <img src="/add.png" alt="" className='pl-1 w-8 h-8 pt-2' />
                        <button className=" pt-2 pb-2 pr-4 pl-2 ">New</button>
                    </div>
                    <div className='opacity-2 mt-1'>
                        <Link>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="appshell_base_LwwiN" data-icon="grip" aria-hidden="true" strokeWidth="2.2" width="30" height="30">
                                <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M19 6C19.5523 6 20 5.55228 20 5C20 4.44772 19.5523 4 19 4C18.4477 4 18 4.44772 18 5C18 5.5523 18.4477 6 19 6Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M5 6C5.55228 6 6 5.55228 6 5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M19 20C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18C18.4477 18 18 18.4477 18 19C18 19.5523 18.4477 20 19 20Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M5 20C5.55228 20 6 19.5523 6 19C6 18.4477 5.55228 18 5 18C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </Link>
                    </div>
                    <div className='mt-1'>
                        <Link>
                            <img src="/avatar.png" alt="" className='w-9' />
                        </Link>
                    </div>
                    <div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default NavBar;
