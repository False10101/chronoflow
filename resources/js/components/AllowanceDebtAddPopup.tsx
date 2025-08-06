import { ChevronsUpDown, Check, X } from "lucide-react";
import React, { useState } from "react";

interface AllowanceDebtAddPopupProps {
    popupOpen: boolean;
    setPopupOpen: (value: boolean) => void;
    operationType: 'add-funds' | 'add-debt' | 'pay-debt'; // Three distinct operations
}

export default function AllowanceDebtAddPopup({
    popupOpen,
    setPopupOpen,
    operationType
}: AllowanceDebtAddPopupProps) {
    if (!popupOpen) return null;

    const [type, setType] = useState<string>("no");
    const [selectedDate, setSelectedDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });

    // Dynamic configuration based on operation type
    const config = {
        'add-funds': {
            title: 'Add Funds',
            buttonText: 'Add',
            borderColor: 'border-[#29C089]', // Your green
            textColor: 'text-[#29C089]', // Your green
            bgColor: 'bg-[#29C089]/20', // Your green
            dropShadow: 'drop-shadow-[0_0_6px_rgba(41,192,137,0.3)]', // Your green
            isPositive: true
        },
        'add-debt': {
            title: 'Add Debt',
            buttonText: 'Add Debt',
            borderColor: 'border-[#D15C5E]', // Your red
            textColor: 'text-[#D15C5E]', // Your red
            bgColor: 'bg-[#D15C5E]/20', // Your red
            dropShadow: 'drop-shadow-[0_0_6px_rgba(209,92,94,0.3)]', // Your red
            isPositive: false
        },
        'pay-debt': {
            title: 'Pay Debt',
            buttonText: 'Pay',
            borderColor: 'border-[#FFC74E]', // Your orange border
            textColor: 'text-[#F8A971]', // Your orange text
            bgColor: 'bg-[#FFC74E]/20', // Your orange bg
            dropShadow: 'drop-shadow-[0_0_6px_rgba(255,199,78,0.3)]', // Your orange shadow
            isPositive: true
        }
    };

    const {
        title,
        buttonText,
        borderColor,
        textColor,
        bgColor,
        dropShadow,
        isPositive
    } = config[operationType];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`relative flex flex-col w-full max-w-md rounded-xl bg-[#0F0A1E] border ${borderColor}/30 pt-5 pb-3 px-6 shadow-lg ${dropShadow} drop-shadow-sm`}>
                <div className="flex items-center">
                    <h2 className={`text-xl font-orbitron text-shadow-[#F4C9FF] text-shadow-sm ${textColor}`}>
                        {title}
                    </h2>
                    <button
                        onClick={() => setPopupOpen(false)}
                        className="flex text-white/70 hover:text-white transition-colors ml-auto"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4 my-5 text-white/70 flex flex-col">
                    <div className="flex w-full flex-col">
                        <label className="block mb-2">Description</label>
                        <input
                            type="text"
                            className={`w-full bg-[#0D0819] border ${borderColor}/30 text-sm rounded-lg px-3 py-2 text-white focus:${borderColor} focus:outline-none`}
                            placeholder={operationType === 'pay-debt' ? 'eg. Credit card payment' : 'eg. Loan from bank'}
                        />
                    </div>

                    <div className="flex justify-between w-full">
                        <div className="flex w-[45%] flex-col">
                            <label className="block mb-2">Date</label>
                            <input
                                type="date"
                                className={`w-full bg-[#0D0819] border ${borderColor}/30 text-sm rounded-lg px-3 py-2 text-white focus:${borderColor} focus:outline-none [&::-webkit-calendar-picker-indicator]:filter-[invert(0.7)]`}
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>

                        <div className="flex w-[45%] flex-col">
                            <label className="block mb-2">Amount</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className={`w-full bg-[#0D0819] border ${borderColor}/30 text-sm rounded-lg px-3 py-2 pl-10 text-white focus:${borderColor} focus:outline-none appearance-none`}
                                    placeholder="0.00"
                                />
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 pr-2 border-r-[1px] border-white/15">
                                    ฿
                                </span>
                                {!isPositive && (
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#D15C5E]">
                                        (Negative)
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {(operationType === 'add-funds' || operationType === 'add-debt') && (
                        <div className="flex w-full flex-col">
                            <label className="block mb-2 text-white/70">Recurring</label>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { value: "no", label: "No" },
                                    { value: "daily", label: "Daily" },
                                    { value: "weekly", label: "Weekly" },
                                    { value: "monthly", label: "Monthly" },
                                    { value: "yearly", label: "Yearly" }
                                ].map((option) => (
                                    <label
                                        key={option.value}
                                        className={`inline-flex items-center px-3 py-1.5 rounded-full justify-center flex-grow border text-sm ${type === option.value
                                                ? `${borderColor} ${bgColor} ${textColor}`
                                                : 'border-white/20 text-white/60 hover:border-white/40'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="recurring"
                                            value={option.value}
                                            checked={type === option.value}
                                            onChange={() => setType(option.value)}
                                            className="sr-only"
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="full flex space-x-5 justify-end mt-2">
                        <button
                            onClick={() => setPopupOpen(false)}
                            className={`w-[22%] hover:scale-105 drop-shadow-md border-[1px] border-white/40 text-white/70 text-sm font-medium py-1 px-2 rounded-lg transition-colors mt-4`}
                        >
                            Cancel
                        </button>
                        <button
                            className={`w-[22%] hover:scale-105 ${dropShadow} drop-shadow-md border-[1px] ${textColor} ${borderColor} text-sm font-medium py-1 px-2 rounded-lg transition-colors mt-4`}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}