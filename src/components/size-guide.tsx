"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Ruler, Info, Footprints } from "lucide-react";

const SIZES = [
    { eu: 36, uk: 3, us: 5, cm: 22.5 },
    { eu: 37, uk: 4, us: 6, cm: 23.5 },
    { eu: 38, uk: 5, us: 7, cm: 24.0 },
    { eu: 39, uk: 6, us: 8, cm: 25.0 },
    { eu: 40, uk: 6.5, us: 9, cm: 25.5 },
    { eu: 41, uk: 7, us: 10, cm: 26.5 },
    { eu: 42, uk: 8, us: 9, cm: 27.0 },
    { eu: 43, uk: 9, us: 10, cm: 28.0 },
    { eu: 44, uk: 10, us: 11, cm: 28.5 },
    { eu: 45, uk: 11, us: 12, cm: 29.5 },
];

export function SizeGuide() {
    const [activeTab, setActiveTab] = useState<"chart" | "measure">("chart");
    const [cmInput, setCmInput] = useState<string>("");
    const [recommendedSize, setRecommendedSize] = useState<any>(null);

    const calculateSize = (val: string) => {
        setCmInput(val);
        const cm = parseFloat(val);
        if (isNaN(cm)) {
            setRecommendedSize(null);
            return;
        }

        // Find the closest size that is >= cm
        const found = SIZES.find(s => s.cm >= cm);
        setRecommendedSize(found || SIZES[SIZES.length - 1]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-xs text-zinc-500 hover:text-black transition-colors underline underline-offset-4">
                    Size Guide
                </button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:max-w-2xl bg-white rounded-none border-none p-0 overflow-hidden h-[90vh] sm:h-auto flex flex-col">
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Header */}
                    <DialogHeader className="p-6 md:p-8 pb-4 border-b border-zinc-100 flex flex-row justify-between items-center space-y-0">
                        <div>
                            <DialogTitle className="font-serif text-2xl md:text-3xl tracking-tight text-black mb-1">Interactive Size Guide</DialogTitle>
                            <p className="text-zinc-500 text-[10px] md:text-sm font-sans tracking-wide">Standard sizing used in Nepal (EU/UK)</p>
                        </div>
                    </DialogHeader>

                    {/* Tabs */}
                    <div className="flex border-b border-zinc-100 bg-zinc-50/50">
                        <button
                            onClick={() => setActiveTab("chart")}
                            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "chart" ? "bg-white text-black border-b-2 border-black" : "text-zinc-400 hover:text-zinc-600"}`}
                        >
                            Size Chart
                        </button>
                        <button
                            onClick={() => setActiveTab("measure")}
                            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "measure" ? "bg-white text-black border-b-2 border-black" : "text-zinc-400 hover:text-zinc-600"}`}
                        >
                            How to Measure
                        </button>
                    </div>

                    <div className="p-6 md:p-8 overflow-y-auto">
                        {activeTab === "chart" ? (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                {/* Calculator */}
                                <div className="bg-white border border-zinc-200 p-6 rounded-none space-y-4 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <Ruler className="w-5 h-5 text-zinc-500" />
                                        <h3 className="text-sm font-semibold uppercase tracking-widest text-black">Find My Perfect Size</h3>
                                    </div>
                                    <div className="flex gap-4 items-end">
                                        <div className="flex-1">
                                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-medium">Foot Length (CM)</label>
                                            <input
                                                type="number"
                                                value={cmInput}
                                                onChange={(e) => calculateSize(e.target.value)}
                                                placeholder="e.g. 25.5"
                                                className="w-full bg-zinc-50 border-zinc-200 text-black px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all rounded-none placeholder:text-zinc-400"
                                            />
                                        </div>
                                        {recommendedSize && (
                                            <div className="flex-1 bg-zinc-900 text-white px-4 py-[11px] border border-zinc-900 animate-in zoom-in-95 duration-300">
                                                <p className="text-[9px] uppercase tracking-widest text-zinc-400 mb-1">Recommended Size</p>
                                                <p className="font-serif text-xl tracking-wide">EU {recommendedSize.eu} / UK {recommendedSize.uk}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="border border-zinc-100">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="bg-zinc-50 border-b border-zinc-100">
                                                <th className="px-4 py-3 font-semibold uppercase tracking-widest text-[10px]">EU</th>
                                                <th className="px-4 py-3 font-semibold uppercase tracking-widest text-[10px]">UK</th>
                                                <th className="px-4 py-3 font-semibold uppercase tracking-widest text-[10px]">US (Mens)</th>
                                                <th className="px-4 py-3 font-semibold uppercase tracking-widest text-[10px]">Foot Length (CM)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {SIZES.map((s, idx) => (
                                                <tr
                                                    key={idx}
                                                    className={`border-b border-zinc-50 transition-colors ${recommendedSize?.eu === s.eu ? 'bg-zinc-900 text-white font-bold' : 'hover:bg-zinc-50'}`}
                                                >
                                                    <td className="px-4 py-3">{s.eu}</td>
                                                    <td className="px-4 py-3">{s.uk}</td>
                                                    <td className="px-4 py-3">{s.us}</td>
                                                    <td className="px-4 py-3">{s.cm} cm</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex gap-2 items-start text-xs text-zinc-400 bg-zinc-50 p-4 leading-relaxed">
                                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                                    <p>Our shoes typically fit true to size. If you are between sizes, we recommend selecting the larger size for a more comfortable fit, especially for leather shoes that may slightly adjust to your foot shape over time.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                                                <h3 className="font-serif text-lg tracking-tight">Trace Your Foot</h3>
                                            </div>
                                            <p className="text-zinc-500 text-sm leading-relaxed">Place a sheet of paper on the floor against a wall. Put your foot on it with your heel against the wall and trace the outline of your foot.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                                                <h3 className="font-serif text-lg tracking-tight">Measure Length</h3>
                                            </div>
                                            <p className="text-zinc-500 text-sm leading-relaxed">Use a ruler to measure the distance from the heel (at the edge of the paper) to your longest toe.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                                                <h3 className="font-serif text-lg tracking-tight">Compare to Chart</h3>
                                            </div>
                                            <p className="text-zinc-500 text-sm leading-relaxed">Use your measurement in cm with our "Find My Size" tool or the chart to select your perfect Coseli fit.</p>
                                        </div>
                                    </div>
                                    <div className="relative aspect-square bg-zinc-100 overflow-hidden flex items-center justify-center p-8">
                                        <Footprints className="w-full h-full text-zinc-200" strokeWidth={0.5} />
                                        <div className="absolute inset-0 border-[20px] border-white/50" />
                                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                                            <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400">Heel to Toe</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
