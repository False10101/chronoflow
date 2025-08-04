import { BadgeDollarSign } from 'lucide-react'
import React from 'react'

interface ExpenseModuleProps {
  expenseBoxSize: number;
  lastUpdated? : string;
  dueBy? : string;
}


export default function ExpenseModule({ expenseBoxSize, lastUpdated, dueBy }: ExpenseModuleProps) {
    return (
        <>
            <div className='flex items-center w-full'>
                <BadgeDollarSign size={25} color='#B388FF' />
                <span className='font-orbitron ml-2'>Allowance Stats</span>
            </div>
            <div className={`expense-box flex flex-col  border-[#DDC4FF]/[15%] rounded-lg border-[1px] w-[95%] self-center justify-items-center mt-3 bg-gradient-to-r from-[#67688F]/[15%] via-[#B34B4D]/[15%] to-[#B34B4D]/[15%] bg-[length:150%_100%] bg-left `}
                style={{ height: `${expenseBoxSize}%` }}
            >
                <div className="mx-4 grid grid-cols-2 h-full text-sm text-white/70 items-center place-content-center">
                    <div className='grid mr-5 h-full my-auto'>
                        <span className='ml-[10%]'>Allowance Left:</span>
                        <span className='flex ml-auto font-orbitron text-xl text-white my-1'>$10000.10</span>
                        {
                            lastUpdated && <span className='text-xs text-[#BBA4FF] ml-[10%]'> Last updated : {lastUpdated}</span>
                        }
                    </div>
                    <div className='grid mr-5 h-full my-auto'>
                        <span className='ml-[30%] '>Debt:</span>
                        <span className='flex ml-auto font-orbitron text-xl text-red-400 my-1'>$10000.10</span>
                        {
                            dueBy && <span className='text-xs text-[#BBA4FF] ml-[30%]'>Due by : {dueBy}</span>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
