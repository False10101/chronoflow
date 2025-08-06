import AllowanceDebtAddPopup from '@/components/AllowanceDebtAddPopup';
import Clock from '@/components/Clock';
import ExpenseAddPopup from '@/components/ExpenseAddPopup';
import ExpenseModule from '@/components/ExpenseModule';
import Navbar from '@/components/Navbar';
import ProgressBar from '@ramonak/react-progress-bar';
import { Banknote, Bus, Edit2, Trash2, CalendarSync, Filter, CreditCard, Ellipsis, HousePlug, HousePlus, Plus, TableOfContents, Tags, UtensilsCrossed, ArrowDownUp } from 'lucide-react';
import React, { useState } from 'react'

const allowanceLogData = [
    { id: 1, date: new Date('2024-06-21'), amount: 500, type: 'salary' },
    { id: 2, date: new Date('2024-06-15'), amount: 200, type: 'bonus' },
    { id: 3, date: new Date('2024-06-10'), amount: 150, type: 'debt' },
    { id: 4, date: new Date('2024-06-07'), amount: 250, type: 'weekly' },
    { id: 5, date: new Date('2024-06-01'), amount: 1000, type: 'monthly' },
    { id: 6, date: new Date('2024-05-25'), amount: 250, type: 'weekly' },
    { id: 7, date: new Date('2024-05-18'), amount: 250, type: 'weekly' },
    { id: 8, date: new Date('2024-05-11'), amount: 250, type: 'weekly' },
    { id: 9, date: new Date('2024-05-04'), amount: 250, type: 'weekly' },
    { id: 10, date: new Date('2024-05-01'), amount: 1000, type: 'monthly' },
    { id: 11, date: new Date('2024-04-27'), amount: 75, type: 'debt' },
    { id: 12, date: new Date('2024-04-20'), amount: 300, type: 'biweekly' },
    { id: 1, date: new Date('2024-06-21'), amount: 500, type: 'salary' },
    { id: 2, date: new Date('2024-06-15'), amount: 200, type: 'bonus' },
    { id: 3, date: new Date('2024-06-10'), amount: 150, type: 'debt' },
    { id: 4, date: new Date('2024-06-07'), amount: 250, type: 'weekly' },
    { id: 5, date: new Date('2024-06-01'), amount: 1000, type: 'monthly' },
    { id: 6, date: new Date('2024-05-25'), amount: 250, type: 'weekly' },
    { id: 7, date: new Date('2024-05-18'), amount: 250, type: 'weekly' },
    { id: 8, date: new Date('2024-05-11'), amount: 250, type: 'weekly' },
    { id: 9, date: new Date('2024-05-04'), amount: 250, type: 'weekly' },
    { id: 10, date: new Date('2024-05-01'), amount: 1000, type: 'monthly' },
    { id: 11, date: new Date('2024-04-27'), amount: 75, type: 'debt' },
    { id: 12, date: new Date('2024-04-20'), amount: 300, type: 'biweekly' },
];

const expenseListData = [
    {
        id: 1,
        date: new Date('2024-06-21'),
        description: 'Groceries at Market',
        category: 'Food',
        amount: 42.50,
        recurring: 'weekly'
    },
    {
        id: 2,
        date: new Date('2024-06-20'),
        description: 'Electricity Bill',
        category: 'Utility',
        amount: 85.00,
        recurring: 'monthly'
    },
    {
        id: 3,
        date: new Date('2024-06-19'),
        description: 'Bus Pass',
        category: 'Transport',
        amount: 35.00,
        recurring: 'monthly'
    },
    {
        id: 4,
        date: new Date('2024-06-18'),
        description: 'Netflix Subscription',
        category: 'Subs',
        amount: 15.99,
        recurring: 'monthly'
    },
    {
        id: 5,
        date: new Date('2024-06-17'),
        description: 'Dinner with Friends',
        category: 'Food',
        amount: 65.80,
        recurring: 'no'
    },
    {
        id: 6,
        date: new Date('2024-06-16'),
        description: 'Office Supplies',
        category: 'Misc',
        amount: 22.30,
        recurring: 'no'
    },
    {
        id: 7,
        date: new Date('2024-06-15'),
        description: 'Rent Payment',
        category: 'Rent',
        amount: 1200.00,
        recurring: 'monthly'
    },
];

const ExpenseTracker = () => {

    const [expenseAddPopup , setExpenseAddPopup] = useState<boolean>(false);
    const [allowanceDebtAddPopup, setAllowanceDebtAddPopup] = useState<boolean>(false);
    const [popupType, setPopupType] = useState<'add-funds' | 'add-debt' | 'pay-debt'>("add-funds");

    const handleExpenseAddPopup = () =>{
        setExpenseAddPopup(!expenseAddPopup);
    }

    const handleAllowanceDebtAddPopup = (type: 'add-funds' | 'add-debt' | 'pay-debt') =>{
        setPopupType(type)
        setAllowanceDebtAddPopup(!allowanceDebtAddPopup);
    }

    const formatDate = (date: Date) => {
        return date.toLocaleString('default', { month: 'long', day: 'numeric' });
    };

    const formatAmount = (type: string, amount: number) => {
        return `${type === 'debt' ? '- ฿' : '+ ฿'}${amount.toFixed(2)}`;
    };

    const getTypeStyle = (type: string) => {
        switch (type) {
            case 'salary':
                return 'text-green-400';
            case 'bonus':
                return 'text-yellow-400';
            case 'debt':
                return 'text-red-400';
            case 'weekly':
                return 'text-blue-400';
            case 'biweekly':
                return 'text-purple-400';
            case 'monthly':
                return 'text-cyan-400';
            default:
                return 'text-white';
        }
    };

    return (
        <div className="flex h-min xl:h-screen bg-gradient-to-t from-[#05020A] to-[#100A14] xl:max-h-screen overflow-hidden w-full">
            <ExpenseAddPopup expenseAddPopup={expenseAddPopup} setExpenseAddPopup={setExpenseAddPopup} />
            <AllowanceDebtAddPopup popupOpen={allowanceDebtAddPopup} setPopupOpen={setAllowanceDebtAddPopup} operationType={popupType}/>
            <Navbar />
            <div className='main-container flex flex-col w-[95%] h-full p-7'>
                <div className='top-row grid xl:flex mb-4 ml-3'>
                    <div className='space-y-1 flex flex-col '>
                        <h1 className='font-lexend text-3xl font-bold text-[#C6A6FF]'>Expense <span className='text-white'>Tracker</span></h1>
                        <span className='border-t-[1px] pr-7 border-white/[63%] pt-1 w-max text-sm text-white/70'>Track, manage and analyze your spending</span>
                    </div>
                    <Clock />
                </div>
                <div className='middle-row flex h-[40%]  mx-7 '>
                    <div className='allowance-stats flex flex-col expense-stat-container w-[40%] h-full justify-center'>
                        <ExpenseModule expenseBoxSize={30} dueBy='June 30, 2024' lastUpdated='Today, 2:30 PM' />
                        <div className='expense-options-box flex flex-col mt-4 w-[97.5%]'>
                            <div className='flex '>
                                <h1 className='text-white/70 '>Daily Spending Limit</h1>
                                <span className='flex ml-auto text-[#B388FF]'>
                                    $8.5/$10
                                </span>
                            </div>
                            <ProgressBar className='mt-2 mb-2 ' height='0.6em' completed={85} isLabelVisible={false} animateOnRender={true} bgColor='linear-gradient(to right, #B388FF 0%, #DA8FFF 100%)' baseBgColor='#FFFFFF1A' />
                            <span className='text-sm text-[#BBA4FF]'>85% of daily limit used</span>
                            <div className='button-group flex w-full gap-5 mt-4 justify-between'>
                                <button onClick={ handleExpenseAddPopup } className='flex flex-grow border-[1px] rounded-lg py-1 px-3 text-sm items-center justify-center space-x-1 text-[#B388FF] border-[#B388FF]'><Plus size={15} color='#B388FF' /> <span>Add Expense</span></button>
                                <button onClick={ ()=>{handleAllowanceDebtAddPopup('add-funds')}} className='flex flex-grow border-[1px] rounded-lg py-1 px-3 text-sm items-center justify-center space-x-1 border-[#88FFCF] text-[#88FF90]'><Plus size={15} color='#88FF90' /> <span>Add Funds</span></button>
                                <button onClick={ ()=>{handleAllowanceDebtAddPopup('add-debt')}} className='flex flex-grow border-[1px] rounded-lg py-1 px-3 text-sm items-center justify-center space-x-1 border-[#F87171]/70 text-[#F87171]'><CreditCard size={17} color='#F87171' /> <span>Add Debt</span></button>
                                <button onClick={ ()=>{handleAllowanceDebtAddPopup('pay-debt')}} className='flex flex-grow border-[1px] rounded-lg py-1 px-3 text-sm items-center justify-center space-x-1 border-[#FFC74E]/70 text-[#F8A971]'><CreditCard size={17} color='#F8A971' /> <span>Pay Debt</span></button>
                            </div>
                        </div>
                    </div>
                    <div className='expense-categories bg-black/30 w-[55%] border-[1px] border-[#B388FF]/50 rounded-xl ml-auto flex flex-col px-7 justify-center'>
                        <div className='top-row flex'>
                            <Tags size={25} color='#B388FF' />
                            <h1 className='font-orbitron ml-2'>
                                Expense Categories
                            </h1>
                            <span className='flex ml-auto font-bold'>Total Expenses: <span className='ml-1  text-[#D9C3FF] text-shadow-white text-shadow-sm'>$121.10</span></span>
                        </div>
                        <div className='expense-category-list grid grid-cols-3 grid-rows-2 gap-x-10 gap-y-3 mt-3'>

                            <div className='food-box flex border-[1px] border-white/10 rounded-lg items-center justify-center py-2.5'>
                                <div className='flex flex-col items-center '>
                                    <span className='font-bold text-[#B792F6]'>Food</span>
                                    <div className='w-10 h-10 aspect-square bg-[#B388FF]/20 rounded-full flex items-center justify-center'>
                                        <UtensilsCrossed size={20} color='#B388FF' />
                                    </div>
                                </div>
                                <div className='flex flex-col '>
                                    <span className='font-orbitron pl-6 border-b-[1px] border-[#B388FF]/20 py-1'>$42.20</span>
                                    <span className='pl-6 text-sm py-1 text-white/50'><span className='mr-1 text-[#B388FF]'>35%</span> of total</span>
                                </div>
                            </div>

                            <div className='rent-box flex border-[1px] border-white/10 rounded-lg items-center justify-center py-2'>
                                <div className='flex flex-col items-center '>
                                    <span className='font-bold text-[#B792F6]'>Rent</span>
                                    <div className='w-10 h-10 aspect-square bg-[#B388FF]/20 rounded-full flex items-center justify-center'>
                                        <HousePlus size={20} color='#B388FF' />
                                    </div>
                                </div>
                                <div className='flex flex-col '>
                                    <span className='font-orbitron pl-6 border-b-[1px] border-[#B388FF]/20 py-1'>$42.20</span>
                                    <span className='pl-6 text-sm py-1 text-white/50'><span className='mr-1 text-[#B388FF]'>35%</span> of total</span>
                                </div>
                            </div>

                            <div className='utility-box flex border-[1px] border-white/10 rounded-lg items-center justify-center py-2'>
                                <div className='flex flex-col items-center '>
                                    <span className='font-bold text-[#B792F6]'>Utility</span>
                                    <div className='w-10 h-10 aspect-square bg-[#B388FF]/20 rounded-full flex items-center justify-center'>
                                        <HousePlug size={20} color='#B388FF' />
                                    </div>
                                </div>
                                <div className='flex flex-col '>
                                    <span className='font-orbitron pl-6 border-b-[1px] border-[#B388FF]/20 py-1 '>$42.20</span>
                                    <span className='pl-6 text-sm py-1 text-white/50'><span className='mr-1 text-[#B388FF]'>35%</span> of total</span>
                                </div>
                            </div>

                            <div className='transport-box flex border-[1px] border-white/10 rounded-lg items-center justify-center py-2'>
                                <div className='flex flex-col items-center '>
                                    <span className='font-bold text-[#B792F6]'>Transport</span>
                                    <div className='w-10 h-10 aspect-square bg-[#B388FF]/20 rounded-full flex items-center justify-center'>
                                        <Bus size={20} color='#B388FF' />
                                    </div>
                                </div>
                                <div className='flex flex-col '>
                                    <span className='font-orbitron pl-6 border-b-[1px] border-[#B388FF]/20 py-1 '>$42.20</span>
                                    <span className='pl-6 text-sm py-1 text-white/50'><span className='mr-1 text-[#B388FF]'>35%</span> of total</span>
                                </div>
                            </div>

                            <div className='subscriptions-box flex border-[1px] border-white/10 rounded-lg items-center justify-center py-2'>
                                <div className='flex flex-col items-center '>
                                    <span className='font-bold text-[#B792F6]'>Subs</span>
                                    <div className='w-10 h-10 aspect-square bg-[#B388FF]/20 rounded-full flex items-center justify-center'>
                                        <CalendarSync size={20} color='#B388FF' />
                                    </div>
                                </div>
                                <div className='flex flex-col '>
                                    <span className='font-orbitron pl-6 border-b-[1px] border-[#B388FF]/20 py-1 '>$42.20</span>
                                    <span className='pl-6 text-sm py-1 text-white/50'><span className='mr-1 text-[#B388FF]'>35%</span> of total</span>
                                </div>
                            </div>

                            <div className='miscellaneous-box flex border-[1px] border-white/10 rounded-lg items-center justify-center py-2'>
                                <div className='flex flex-col items-center '>
                                    <span className='font-bold text-[#B792F6]'>Misc</span>
                                    <div className='w-10 h-10 aspect-square bg-[#B388FF]/20 rounded-full flex items-center justify-center'>
                                        <Ellipsis size={20} color='#B388FF' />
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

                <div className='bottom-row flex h-[50%] mx-7 mt-9'>
                    <div className='w-[30%] flex flex-col border-[#B388FF]/50 border-[1px] rounded-xl py-3 px-5'>
                        <div className='top-row flex items-center mb-2'>
                            <Banknote size={30} color='#B388FF' />
                            <span className='ml-2 font-orbitron'>Allowance Log</span>
                        </div>
                        <div className='allowance-list flex-col flex'>
                            <div className='header flex w-full text-white/80 text-sm border-b-[1px] py-2 border-white/10'>
                                <span className='flex flex-grow '>Date</span>
                                <span className='flex flex-grow pl-[8%]'>Amount</span>
                                <span className='flex flex-grow '>Type</span>
                            </div>

                            <div className='allowance-entries overflow-y-auto max-h-[17rem] pr-2'>
                                {allowanceLogData.map((entry) => (
                                    <div key={entry.id} className='flex w-full py-3.5 text-sm border-b-[1px] border-white/5'>
                                        <span className='flex w-[33%] text-white'>{formatDate(entry.date)}</span>
                                        <span className={`flex w-[33%] ml-[10%] justify-start ${entry.type === 'debt' ? 'text-red-400' : 'text-green-400'}`}>
                                            {formatAmount(entry.type, entry.amount)}
                                        </span>
                                        <span className={`flex w-[33%] ml-[10%] ${getTypeStyle(entry.type)}`}

                                        >
                                            {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='w-[65%] flex flex-col border-[#B388FF]/50 border-[1px] rounded-xl py-3 px-5 ml-auto'>
                        <div className='top-row flex w-full items-center my-1'>
                            <TableOfContents size={23} color='#B388FF' className='rotate-180' />
                            <h1 className='font-orbitron ml-2'>Recent Expenses</h1>
                            <div className='config-group flex ml-auto space-x-3'>
                                <div className='filter flex px-3 py-0.5 border-white/10 rounded-full border-[1px] items-center justify-center'>
                                    <Filter size={11} color='rgba(255, 255, 255, 0.7)' />
                                    <span className='text-xs ml-1'>Filter</span>
                                </div>
                                <div className='sort flex px-3 py-0.5 border-white/10 rounded-full border-[1px] items-center justify-center'>
                                    <ArrowDownUp size={11} color='rgba(255, 255, 255, 0.7)' />
                                    <span className='text-xs ml-1'>Sort</span>
                                </div>
                                <div className='filter bg-[#B388FF]/20 flex px-3 py-0.5 border-[#B388FF] rounded-full border-[1px] items-center justify-center'>
                                    <span className='text-xs text-[#B388FF]'>View All</span>
                                </div>
                            </div>
                        </div>
                        <div className='recent-expense-main-container flex flex-col'>
                            <div className='header flex pt-3 text-sm font-bold text-[#DCC8FF] pb-2 w-full justify-center items-center border-b-[1px] border-white/10'>
                                <span className='w-[13.5%] flex ml-[2.5%] items-center '>Date</span>
                                <span className='w-[25%] flex ml-[2.5%] items-center '>Description</span>
                                <span className='w-[20%] flex ml-[1.5%] items-center '>Category</span>
                                <span className='w-[13%] flex   items-center '>Amount</span>
                                <span className='w-[13.5%] flex justify-center items-center '>Recurring</span>
                                <span className='w-[15%] flex justify-center items-center '>Actions</span>
                            </div>

                            <div className='expense-list overflow-y-auto max-h-[17rem] bg-[radial-gradient(ellipse_at_center,_#241A3A_0%,_#07020D_100%)]'>
                                {expenseListData.map((expense) => (
                                    <div key={expense.id} className='flex w-full py-4 text-sm border-b-[1px] border-white/5 items-center'>
                                        <span className='w-[13.5%] flex ml-[2.5%] text-white'>{formatDate(expense.date)}</span>
                                        <span className='w-[25%] flex ml-[2.5%] text-white'>{expense.description}</span>
                                        <span className='w-[20%] flex ml-[1.5%] '>{expense.category}</span>
                                        <span className='w-[13%] flex '>฿{expense.amount.toFixed(2)}</span>
                                        <span className='w-[13.5%] flex justify-center'>
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${expense.recurring === 'no' ? 'bg-gray-700/50 text-gray-400' :
                                                    expense.recurring === 'daily' ? 'bg-blue-900/30 text-blue-400' :
                                                        expense.recurring === 'weekly' ? 'bg-purple-900/30 text-purple-400' :
                                                            expense.recurring === 'biweekly' ? 'bg-indigo-900/30 text-indigo-400' :
                                                                'bg-cyan-900/30 text-cyan-400'
                                                }`}>
                                                {expense.recurring.charAt(0).toUpperCase() + expense.recurring.slice(1)}
                                            </span>
                                        </span>
                                        <span className='w-[15%] flex justify-center space-x-3'>
                                            <button className='text-[#B388FF] hover:text-[#DA8FFF]'>
                                                <Edit2 size={16} />
                                            </button>
                                            <button className='text-red-400 hover:text-red-300'>
                                                <Trash2 size={16} />
                                            </button>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ExpenseTracker;
