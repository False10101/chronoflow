import { ChevronsUpDown, Check, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface ExpenseAddPopupProps {
    expenseAddPopup: boolean;
    setExpenseAddPopup: (value: boolean) => void;
}

export default function ExpenseAddPopup({ expenseAddPopup, setExpenseAddPopup }: ExpenseAddPopupProps) {
    const [category, setCategory] = useState<string>("miscellaneous");
    const [isRecurring, setIsRecurring] = useState<string>("no");
    const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string>(() => {
        const today = new Date();

        return today.toISOString().split("T")[0];
    })
    const dropdownRef = useRef<HTMLDivElement>(null);

    const categories = [
        { value: "food", label: "Food" },
        { value: "rent", label: "Rent" },
        { value: "utility", label: "Utility" },
        { value: "transport", label: "Transport" },
        { value: "subscription", label: "Subscription" },
        { value: "miscellaneous", label: "Miscellaneous" },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsCategoryOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!expenseAddPopup) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative flex flex-col w-full max-w-md rounded-xl bg-[#0F0A1E] border border-[#DBC6FF]/28 pt-5 pb-3 px-6 shadow-lg drop-shadow-[#B388FF] drop-shadow-sm">
                <div className="flex items-center">
                    <h2 className="text-xl font-orbitron text-[#C6A6FF] text-shadow-[#F4C9FF] text-shadow-sm">
                        Add New Expense
                    </h2>
                    <button
                        onClick={() => setExpenseAddPopup(false)}
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
                            className="w-full bg-[#0D0819] border border-[#B388FF]/30 text-sm rounded-lg px-3 py-2 text-white focus:border-[#B388FF] focus:outline-none"
                            placeholder="eg. Lunch at School"
                        />
                    </div>

                    <div className="flex justify-between w-full">
                        <div className="flex w-[45%] flex-col">
                            <label className="block mb-2">Date</label>
                            <input
                                type="date"
                                className="w-full bg-[#0D0819] border border-[#B388FF]/30 text-sm rounded-lg px-3 py-2 text-white focus:border-[#B388FF] focus:outline-none [&::-webkit-calendar-picker-indicator]:filter-[invert(0.7)]"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>

                        <div className="flex w-[45%] flex-col">
                            <label className="block mb-2">Amount</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-full bg-[#0D0819] border border-[#B388FF]/30 text-sm rounded-lg px-3 py-2 pl-10 text-white focus:border-[#B388FF] focus:outline-none appearance-none"
                                    placeholder="0.00"
                                />
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 pr-2 border-r-[1px] border-white/15">
                                    ฿
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full flex-col">
                        <label className="block mb-2">Category</label>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                className="w-full justify-between bg-[#0D0819] border border-[#B388FF]/30 text-sm rounded-lg px-3 py-2 text-left text-white flex items-center hover:border-[#B388FF] transition-colors"
                            >
                                <span className="truncate">
                                    {category
                                        ? categories.find((c) => c.value === category)?.label
                                        : "Select category..."}
                                </span>
                                <ChevronsUpDown className="h-4 w-4 opacity-70" />
                            </button>

                            {isCategoryOpen && (
                                <div className="absolute z-50 w-full mt-1 bg-[#0D0819] border border-[#B388FF]/30 rounded-lg shadow-lg overflow-hidden">
                                    <div className="max-h-60 overflow-y-auto">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.value}
                                                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-[#B388FF]/10 ${category === cat.value ? "text-[#B388FF]" : "text-white/80"
                                                    }`}
                                                onClick={() => {
                                                    setCategory(cat.value);
                                                    setIsCategoryOpen(false);
                                                }}
                                            >
                                                {cat.label}
                                                {category === cat.value && (
                                                    <Check className="h-4 w-4 text-[#B388FF]" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

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
                                    className={`inline-flex items-center px-3 py-1.5 rounded-full justify-center flex-grow border text-sm ${isRecurring === option.value
                                            ? 'border-[#B388FF] bg-[#B388FF]/10 text-[#B388FF]'
                                            : 'border-white/20 text-white/60 hover:border-white/40'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="recurring"
                                        value={option.value}
                                        checked={isRecurring === option.value}
                                        onChange={() => setIsRecurring(option.value)}
                                        className="sr-only" // Hide default radio visually but keep accessible
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="full flex space-x-5 justify-end mt-2">
                        <button onClick={()=>(setExpenseAddPopup(false))}  className="w-[22%] hover:scale-105 drop-shadow-[#B388FF] drop-shadow-md border-[1px] border-white/40 text-white/70 text-sm font-medium py-1 px-2 rounded-lg transition-colors mt-4">
                        Cancel
                    </button>
                    <button className="w-[22%] hover:scale-105 drop-shadow-[#B388FF] drop-shadow-md border-[1px] text-[#B388FF] border-[#B388FF] text-sm font-medium py-1 px-2 rounded-lg transition-colors mt-4">
                        Add
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}