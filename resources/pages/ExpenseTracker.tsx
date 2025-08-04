import Clock from '@/components/Clock';
import ExpenseModule from '@/components/ExpenseModule';
import Navbar from '@/components/Navbar';
import ProgressBar from '@ramonak/react-progress-bar';
import { Bus, CalendarSync, CreditCard, Ellipsis, HousePlug, HousePlus, Plus, Tags, UtensilsCrossed } from 'lucide-react';
import React from 'react'

const ExpenseTracker =() => {
    return (
        <div className="flex h-min xl:h-screen bg-gradient-to-t from-[#05020A] to-[#100A14] xl:max-h-screen overflow-hidden w-full">
            <Navbar/>
            <div className='main-container flex flex-col w-[95%] h-full p-7'>
                <div className='top-row grid xl:flex mb-6 ml-3'>
                    <div className='space-y-1 flex flex-col '>
                        <h1 className='font-lexend text-3xl font-bold text-[#C6A6FF]'>Expense <span className='text-white'>Tracker</span></h1>
                        <span className='border-t-[1px] pr-7 border-white/[63%] pt-1 w-max text-sm text-white/70'>Track, manage and analyze your spending</span>
                    </div>
                    <Clock />
                </div>
                <div className='middle-row flex h-[35%] mt-4 mx-7 '>
                    <div className='allowance-stats flex flex-col expense-stat-container w-[40%] h-full justify-center'>
                        <ExpenseModule expenseBoxSize={30} dueBy='June 30, 2024' lastUpdated='Today, 2:30 PM'/>
                        <div className='expense-options-box flex flex-col mt-4 w-[97.5%]'>
                            <div className='flex '>
                                <h1 className='text-white/70 '>Daily Spending Limit</h1>
                                <span className='flex ml-auto text-[#B388FF]'>
                                    $8.5/$10
                                </span>
                            </div>
                            <ProgressBar className='mt-2 mb-2 ' height='0.6em' completed={85} isLabelVisible={false} animateOnRender={true} bgColor='linear-gradient(to right, #B388FF 0%, #DA8FFF 100%)' baseBgColor='#FFFFFF1A'/>
                            <span className='text-sm text-[#BBA4FF]'>85% of daily limit used</span>
                            <div className='button-group flex w-[97.5%] gap-4 mt-4'>
                                <button className='flex flex-grow border-[1px] rounded-lg py-1 px-3 text-sm items-center justify-center space-x-1 text-[#B388FF] border-[#B388FF]'><Plus size={15} color='#B388FF'/> <span>Add Expense</span></button>
                                <button className='flex flex-grow border-[1px] rounded-lg py-1 px-3 text-sm items-center justify-center space-x-1 border-[#88FFCF] text-[#88FF90]'><Plus size={15} color='#88FF90'/> <span>Add Expense</span></button>
                                <button className='flex flex-grow border-[1px] rounded-lg py-1 px-3 text-sm items-center justify-center space-x-1 border-[#F87171]/70 text-[#F87171]'><CreditCard size={17} color='#F87171'/> <span>Add Debt</span></button>
                                <button className='flex flex-grow border-[1px] rounded-lg py-1 px-3 text-sm items-center justify-center space-x-1 border-[#FFC74E]/70 text-[#F8A971]'><CreditCard size={17} color='#F8A971'/> <span>Pay Debt</span></button>
                            </div>
                        </div>
                    </div>
                    <div className='expense-categories bg-black/30 w-[55%] border-[1px] border-[#B388FF]/50 rounded-xl ml-auto flex flex-col px-7 justify-center'>
                        <div className='top-row flex'>
                            <Tags size={25} color='#B388FF'/>
                            <h1 className='font-orbitron ml-2'>
                                Expense Categories
                            </h1>
                            <span className='flex ml-auto font-bold'>Total Expenses: <span className='ml-1  text-[#D9C3FF] text-shadow-white text-shadow-sm'>$121.10</span></span>
                        </div>
                        <div className='expense-category-list grid grid-cols-3 grid-rows-2 gap-x-10 gap-y-5 mt-3'>

                            <div className='food-box flex border-[1px] border-white/10 rounded-lg items-center justify-center py-2.5'>
                                <div className='flex flex-col items-center '>
                                    <span className='font-bold text-[#B792F6]'>Food</span>
                                    <div className='w-10 h-10 aspect-square bg-[#B388FF]/20 rounded-full flex items-center justify-center'>
                                        <UtensilsCrossed size={20} color='#B388FF'/>
                                    </div>
                                </div>
                                <div className='flex flex-col '>
                                    <span className='font-orbitron pl-6 border-b-[1px] border-[#B388FF]/20 py-1'>$42.20</span>
                                    <span className='pl-6 text-sm py-1 text-white/50'><span className='mr-1 text-[#B388FF]'>35%</span> of total</span>
                                </div>
                            </div>

                            <div className='rent-box flex border-[1px] border-white/10 rounded-lg items-center justify-center py-2.5'>
                                <div className='flex flex-col items-center '>
                                    <span className='font-bold text-[#B792F6]'>Rent</span>
                                    <div className='w-10 h-10 aspect-square bg-[#B388FF]/20 rounded-full flex items-center justify-center'>
                                        <HousePlus size={20} color='#B388FF'/>
                                    </div>
                                </div>
                                <div className='flex flex-col '>
                                    <span className='font-orbitron pl-6 border-b-[1px] border-[#B388FF]/20 py-1'>$42.20</span>
                                    <span className='pl-6 text-sm py-1 text-white/50'><span className='mr-1 text-[#B388FF]'>35%</span> of total</span>
                                </div>
                            </div>

                            <div className='utility-box flex border-[1px] border-white/10 rounded-lg items-center justify-center py-2.5'>
                                <div className='flex flex-col items-center '>
                                    <span className='font-bold text-[#B792F6]'>Utility</span>
                                    <div className='w-10 h-10 aspect-square bg-[#B388FF]/20 rounded-full flex items-center justify-center'>
                                        <HousePlug size={20} color='#B388FF'/>
                                    </div>
                                </div>
                                <div className='flex flex-col '>
                                    <span className='font-orbitron pl-6 border-b-[1px] border-[#B388FF]/20 py-1 '>$42.20</span>
                                    <span className='pl-6 text-sm py-1 text-white/50'><span className='mr-1 text-[#B388FF]'>35%</span> of total</span>
                                </div>
                            </div>

                            <div className='transport-box flex border-[1px] border-white/10 rounded-lg items-center justify-center py-2.5'>
                                <div className='flex flex-col items-center '>
                                    <span className='font-bold text-[#B792F6]'>Transport</span>
                                    <div className='w-10 h-10 aspect-square bg-[#B388FF]/20 rounded-full flex items-center justify-center'>
                                        <Bus size={20} color='#B388FF'/>
                                    </div>
                                </div>
                                <div className='flex flex-col '>
                                    <span className='font-orbitron pl-6 border-b-[1px] border-[#B388FF]/20 py-1 '>$42.20</span>
                                    <span className='pl-6 text-sm py-1 text-white/50'><span className='mr-1 text-[#B388FF]'>35%</span> of total</span>
                                </div>
                            </div>

                            <div className='subscriptions-box flex border-[1px] border-white/10 rounded-lg items-center justify-center py-2.5'>
                                <div className='flex flex-col items-center '>
                                    <span className='font-bold text-[#B792F6]'>Subs</span>
                                    <div className='w-10 h-10 aspect-square bg-[#B388FF]/20 rounded-full flex items-center justify-center'>
                                        <CalendarSync size={20} color='#B388FF'/>
                                    </div>
                                </div>
                                <div className='flex flex-col '>
                                    <span className='font-orbitron pl-6 border-b-[1px] border-[#B388FF]/20 py-1 '>$42.20</span>
                                    <span className='pl-6 text-sm py-1 text-white/50'><span className='mr-1 text-[#B388FF]'>35%</span> of total</span>
                                </div>
                            </div>

                            <div className='miscellaneous-box flex border-[1px] border-white/10 rounded-lg items-center justify-center py-2.5'>
                                <div className='flex flex-col items-center '>
                                    <span className='font-bold text-[#B792F6]'>Misc</span>
                                    <div className='w-10 h-10 aspect-square bg-[#B388FF]/20 rounded-full flex items-center justify-center'>
                                        <Ellipsis size={20} color='#B388FF'/>
                                    </div>
                                </div>
                                <div className='flex flex-col '>
                                    <span className='font-orbitron pl-6 border-b-[1px] border-[#B388FF]/20 py-1 '>$42.20</span>
                                    <span className='pl-6 text-sm py-1 text-white/50'><span className='mr-1 text-[#B388FF]'>35%</span> of total</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bottom-row flex '>

                </div>
                
            </div>
        </div>
    )
}

export default ExpenseTracker;
