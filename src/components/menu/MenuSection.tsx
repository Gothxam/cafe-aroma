'use client';

import { MenuItem } from "../../../data/menu";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface Props {
  title: string;
  items: MenuItem[];
}

export default function MenuSection({ title, items }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-10">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex items-center justify-between
          text-left
          text-2xl font-semibold
          text-white
          pb-3 border-b border-white/20
        "
      >
        {title}
        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expandable content */}
      <div
        className={`
          overflow-hidden transition-all duration-500
          ${open ? 'max-h-[2000px] mt-6' : 'max-h-0'}
        `}
      >
        <ul className="space-y-6">
          {items.map((item) => {
            const isFeatured = item.featured;

            return (
              <li
                key={item.id}
                className={`
                  bg-white/5 rounded-xl p-5 backdrop-blur-md
                  ${isFeatured ? 'text-center flex flex-col items-center' : 'flex gap-4 items-start'}
                `}
              >
                {/* FEATURED IMAGE CENTERED */}
                {item.image && (
                  <div
                    className={`
                      relative overflow-hidden rounded-xl
                      ${isFeatured ? 'w-40 h-40 mb-4' : 'w-20 h-20 shrink-0'}
                    `}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="100%"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Info */}
                <div className={`${isFeatured ? 'max-w-md' : 'flex-1'}`}>
                  <p
                    className={`
                      font-semibold text-white 
                      ${isFeatured ? 'text-xl' : ''}
                    `}
                  >
                    {item.name}
                  </p>

                  {item.description && (
                    <p
                      className={`
                        text-sm text-white/70 mt-1 
                        ${isFeatured ? 'text-center' : 'line-clamp-2'}
                      `}
                    >
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div
                  className={`
                    ${isFeatured ? 'mt-3' : 'text-right'}
                  `}
                >
                  <p className="font-semibold text-white">
                    ${item.offerPrice ?? item.price}
                  </p>

                  {item.offerPrice && (
                    <p className="text-xs text-white/50 line-through">
                      ${item.price}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
