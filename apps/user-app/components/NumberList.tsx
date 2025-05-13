"use client"; // Client-side component

import { useState, useEffect } from "react";
import { Loader2, User } from "lucide-react";

interface NumberListProps {
  number: string;
  onSelect: (value: string) => void;
}

export function NumberList({ number, onSelect }: NumberListProps) {
  const [filteredNumbers, setFilteredNumbers] = useState<{ number: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  const fetchNumbers = async (input: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/numbers?search=${input}`);
      const data = await response.json();
      setFilteredNumbers(data.numbers);
    } catch (error) {
      console.error("Error fetching numbers:", error);
    } finally {
      setLoading(false);
    }
  };

  //debounce the input to avoid multiple requests
  useEffect(() => {
    if (number.length > 0) {
      const timer = setTimeout(() => {
        fetchNumbers(number);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setFilteredNumbers([]);
    }
  }, [number]);

  const handleSelect = (selectedNumber: string) => {
    onSelect(selectedNumber);
    setFilteredNumbers([]); // Clear the list after selection
  };

  return (
    <div className="relative z-10">
      {loading && (
        <div className="absolute bg-dark-200/90 backdrop-blur-sm border border-dark-300 w-full rounded-lg shadow-lg mt-1 p-3 flex items-center justify-center">
          <Loader2 className="h-4 w-4 text-accent-blue-light animate-spin mr-2" />
          <p className="text-sm text-slate-300">Searching...</p>
        </div>
      )}
      
      {!loading && filteredNumbers.length > 0 && (
        <ul className="absolute bg-dark-200/90 backdrop-blur-sm border border-dark-300 w-full rounded-lg shadow-lg mt-1 py-1 max-h-48 overflow-y-auto scrollbar-thin">
          {filteredNumbers.map((numObj) => (
            <li
              key={numObj.number}
              onClick={() => handleSelect(numObj.number)}
              className="px-3 py-2 hover:bg-dark-300/60 cursor-pointer flex items-center text-sm text-slate-200 transition-colors"
            >
              <User className="h-4 w-4 text-slate-400 mr-3" />
              {numObj.number}
            </li>
          ))}
        </ul>
      )}
      
      {!loading && number.length > 0 && filteredNumbers.length === 0 && (
        <div className="absolute bg-dark-200/90 backdrop-blur-sm border border-dark-300 w-full rounded-lg shadow-lg mt-1 p-3">
          <p className="text-sm text-slate-300 text-center">No matches found</p>
        </div>
      )}
    </div>
  );
}
