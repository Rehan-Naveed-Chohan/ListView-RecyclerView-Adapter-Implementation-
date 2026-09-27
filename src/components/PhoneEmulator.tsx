import React, { useState, useRef, useEffect } from 'react';
import { 
  Wifi, 
  BatteryMedium, 
  Signal, 
  Plus, 
  RotateCcw, 
  Grid, 
  List, 
  Sparkles, 
  Tag, 
  Eye, 
  CheckCircle2, 
  Heart,
  ChevronRight,
  Layers,
  ArrowUpDown,
  X
} from 'lucide-react';
import { ProductItem, ViewMode, LogEntry } from '../types/androidLab';
import { ProductIcon } from './ProductIcon';

interface PhoneEmulatorProps {
  products: ProductItem[];
  onAddProduct: (product: Omit<ProductItem, 'id'>) => void;
  onResetProducts: () => void;
  onLogcatMessage: (log: Omit<LogEntry, 'id' | 'timestamp'>) => void;
}

export const PhoneEmulator: React.FC<PhoneEmulatorProps> = ({
  products,
  onAddProduct,
  onResetProducts,
  onLogcatMessage
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('recyclerview_linear');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimeout, setToastTimeout] = useState<NodeJS.Timeout | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set([2, 5]));
  const [showRecyclingInspector, setShowRecyclingInspector] = useState<boolean>(false);
  
  // Real-time recycling metrics
  const [inflatedCount, setInflatedCount] = useState<number>(6); // Only ~5-6 views inflated
  const [bindCount, setBindCount] = useState<number>(8); // Increments when binding
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // New product form
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Accessories');
  const [newIcon, setNewIcon] = useState<'keyboard' | 'monitor' | 'laptop' | 'gaming'>('keyboard');

  const listContainerRef = useRef<HTMLDivElement>(null);

  // Categories list
  const categories = ['All', 'Smartphones', 'Audio', 'Laptops', 'Wearables', 'Photography', 'Gaming', 'Accessories'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  // Show Android Toast
  const triggerToast = (msg: string) => {
    if (toastTimeout) clearTimeout(toastTimeout);
    setToastMessage(msg);
    const timeout = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    setToastTimeout(timeout);
  };

  const handleProductClick = (product: ProductItem, index: number) => {
    if (viewMode === 'listview') {
      const msg = `ListView Clicked: ${product.name}`;
      triggerToast(msg);
      onLogcatMessage({
        level: 'I',
        tag: 'ListView',
        message: `onItemClick() position=${index}, item=${product.name}`
      });
    } else {
      const msg = `Selected: ${product.name} - $${product.price.toFixed(2)}`;
      triggerToast(msg);
      onLogcatMessage({
        level: 'I',
        tag: 'ProductAdapter',
        message: `Task 7 Click: Holder VH #${index % 6} tapped -> ${product.name} ($${product.price.toFixed(2)})`
      });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setScrollPosition(scrollTop);
    // Simulating recycling bind triggers as scroll moves
    const simulatedBinds = Math.floor(scrollTop / 80);
    setBindCount(8 + simulatedBinds);
  };

  const handleToggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const submitNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice.trim()) return;

    const parsedPrice = parseFloat(newPrice) || 49.99;
    onAddProduct({
      name: newTitle.trim(),
      price: parsedPrice,
      category: newCategory,
      imageResId: `R.drawable.ic_${newIcon}`,
      iconKey: newIcon,
      description: 'Newly inserted catalog product item.',
      inStock: true,
      rating: 4.8
    });

    onLogcatMessage({
      level: 'D',
      tag: 'MainActivity',
      message: `Task 8 Challenge 3: Appended product "${newTitle}" -> notifyItemInserted(${products.length})`
    });

    triggerToast(`Added: ${newTitle} - $${parsedPrice.toFixed(2)}`);
    setNewTitle('');
    setNewPrice('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Device Frame */}
      <div className="w-[360px] sm:w-[380px] h-[740px] bg-slate-900 rounded-[44px] p-3 shadow-2xl ring-1 ring-slate-800 relative flex flex-col border-4 border-slate-700/60">
        
        {/* Hardware Bezel & Punch-hole camera */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-center ring-1 ring-slate-800">
          <div className="w-1.5 h-1.5 bg-blue-950/60 rounded-full"></div>
        </div>

        {/* Screen Area */}
        <div className="w-full h-full bg-slate-100 rounded-[34px] overflow-hidden flex flex-col relative text-slate-800 select-none shadow-inner">
          
          {/* Status Bar */}
          <div className="h-7 bg-slate-900 text-slate-300 text-[11px] px-6 flex items-center justify-between font-mono z-20 shrink-0">
            <span className="font-semibold text-slate-200">11:32</span>
            <div className="flex items-center space-x-1.5">
              <Signal size={12} className="text-slate-200" />
              <Wifi size={12} className="text-slate-200" />
              <BatteryMedium size={14} className="text-emerald-400" />
            </div>
          </div>

          {/* Android App Bar (Toolbar) */}
          <div className="bg-slate-900 text-white px-4 py-2.5 shadow-md flex items-center justify-between z-20 shrink-0">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-medium">Week 3 Lab</span>
                <span className="text-[10px] text-slate-400 font-mono">Java + XML</span>
              </div>
              <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                Product Catalog
              </h1>
            </div>

            {/* Quick Action Reset */}
            <button 
              onClick={onResetProducts}
              title="Reset Sample Products"
              className="p-1.5 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Mode Switcher Tabs (Task 3 vs Tasks 4-7 vs Task 8 Challenge) */}
          <div className="bg-slate-800 px-2 py-1.5 flex items-center justify-between gap-1 text-[11px] shrink-0 border-b border-slate-700/60">
            <button
              onClick={() => {
                setViewMode('listview');
                onLogcatMessage({
                  level: 'D',
                  tag: 'MainActivity',
                  message: 'Switched to ListView (Task 3: ArrayAdapter<String>)'
                });
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition flex items-center justify-center gap-1 ${
                viewMode === 'listview' 
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                  : 'text-slate-300 hover:bg-slate-700/60'
              }`}
            >
              <List size={13} />
              <span>ListView</span>
            </button>

            <button
              onClick={() => {
                setViewMode('recyclerview_linear');
                onLogcatMessage({
                  level: 'D',
                  tag: 'MainActivity',
                  message: 'Switched to RecyclerView Linear (Tasks 4-7: LinearLayoutManager)'
                });
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition flex items-center justify-center gap-1 ${
                viewMode === 'recyclerview_linear' 
                  ? 'bg-indigo-500 text-white font-bold shadow-sm' 
                  : 'text-slate-300 hover:bg-slate-700/60'
              }`}
            >
              <ArrowUpDown size={13} />
              <span>Recycler Linear</span>
            </button>

            <button
              onClick={() => {
                setViewMode('recyclerview_grid');
                onLogcatMessage({
                  level: 'D',
                  tag: 'MainActivity',
                  message: 'Switched to RecyclerView Grid (Task 8 Challenge 1: GridLayoutManager(2))'
                });
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition flex items-center justify-center gap-1 ${
                viewMode === 'recyclerview_grid' 
                  ? 'bg-indigo-500 text-white font-bold shadow-sm' 
                  : 'text-slate-300 hover:bg-slate-700/60'
              }`}
            >
              <Grid size={13} />
              <span>2-Col Grid</span>
            </button>
          </div>

          {/* Subheader Toolbar: Challenge 2 Category Filter + Recycling Inspector Toggle */}
          <div className="bg-slate-200/90 px-3 py-1.5 flex items-center justify-between text-[11px] shrink-0 border-b border-slate-300">
            {/* Horizontal Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 max-w-[230px]">
              {categories.slice(0, 5).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Recycling Inspector Toggle */}
            <button
              onClick={() => setShowRecyclingInspector(!showRecyclingInspector)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition ${
                showRecyclingInspector 
                  ? 'bg-purple-600 text-white shadow-xs' 
                  : 'bg-slate-300/80 text-slate-700 hover:bg-slate-300'
              }`}
              title="Show ViewHolder Recycling tags on items"
            >
              <Layers size={11} />
              <span>{showRecyclingInspector ? 'VH On' : 'VH Off'}</span>
            </button>
          </div>

          {/* Live Recycling Status Bar (when inspector enabled) */}
          {showRecyclingInspector && (
            <div className="bg-purple-900 text-purple-100 text-[10px] px-3 py-1 flex items-center justify-between font-mono shrink-0 shadow-sm border-b border-purple-800">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Inflated Views: <strong className="text-emerald-300">{inflatedCount}</strong> (Fixed Pool)
              </span>
              <span>
                onBind calls: <strong className="text-amber-300">{bindCount}</strong>
              </span>
            </div>
          )}

          {/* Main List Content Area */}
          <div 
            ref={listContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-2 relative bg-slate-100 scroll-smooth"
          >
            {/* VIEW MODE 1: Simple ListView (Task 3) */}
            {viewMode === 'listview' && (
              <div className="bg-white rounded-xl shadow-xs border border-slate-200 divide-y divide-slate-200 overflow-hidden">
                <div className="bg-amber-50 px-3 py-1.5 border-b border-amber-200 text-amber-800 text-[11px] font-medium flex items-center justify-between">
                  <span>Task 3: Simple ListView</span>
                  <span className="font-mono text-[10px] bg-amber-200/70 text-amber-900 px-1 rounded">ArrayAdapter&lt;String&gt;</span>
                </div>
                {filteredProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product, idx)}
                    className="p-3.5 hover:bg-amber-50/60 active:bg-amber-100 cursor-pointer flex items-center justify-between transition"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                ))}
              </div>
            )}

            {/* VIEW MODE 2: RecyclerView Linear (Tasks 4-7) */}
            {viewMode === 'recyclerview_linear' && (
              <div className="space-y-2.5 pb-16">
                {filteredProducts.map((product, idx) => {
                  const simulatedViewHolderId = idx % 6; // Simulates 6 reused viewholders
                  const isFav = favorites.has(product.id);

                  return (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product, idx)}
                      className="bg-white rounded-xl p-3 shadow-xs border border-slate-200/90 hover:border-indigo-400 hover:shadow-md transition active:scale-[0.99] cursor-pointer relative flex items-center gap-3 group"
                    >
                      {/* Recycling Inspector Badge */}
                      {showRecyclingInspector && (
                        <div className="absolute -top-1.5 -right-1 bg-purple-700 text-purple-100 text-[9px] font-mono px-1.5 py-0.5 rounded shadow-xs z-10 flex items-center gap-1 border border-purple-500">
                          <span>VH #{simulatedViewHolderId}</span>
                          <span className="text-emerald-300">Reused</span>
                        </div>
                      )}

                      {/* Product Thumbnail (ImageView 72dp) */}
                      <div className="w-16 h-16 rounded-lg bg-indigo-50/70 border border-indigo-100/80 flex items-center justify-center shrink-0 p-2 group-hover:bg-indigo-100/60 transition">
                        <ProductIcon iconKey={product.iconKey} size={28} className="text-indigo-600" />
                      </div>

                      {/* Content (TextViews name, price, category) */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            {product.category}
                          </span>
                          {!product.inStock && (
                            <span className="text-[9px] font-semibold px-1 rounded bg-rose-100 text-rose-700">
                              Out of stock
                            </span>
                          )}
                        </div>

                        <h3 className="text-[13px] font-bold text-slate-900 truncate mt-1">
                          {product.name}
                        </h3>

                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm font-extrabold text-emerald-600 font-mono">
                            ${product.price.toFixed(2)}
                          </span>
                          
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <button
                              onClick={(e) => handleToggleFavorite(product.id, e)}
                              className={`p-1 rounded-full transition ${isFav ? 'text-rose-500' : 'text-slate-300 hover:text-slate-500'}`}
                            >
                              <Heart size={14} fill={isFav ? "currentColor" : "none"} />
                            </button>
                            <ChevronRight size={14} className="text-slate-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* VIEW MODE 3: RecyclerView 2-Column Grid (Task 8 Challenge 1) */}
            {viewMode === 'recyclerview_grid' && (
              <div className="grid grid-cols-2 gap-2 pb-16">
                {filteredProducts.map((product, idx) => {
                  const simulatedViewHolderId = idx % 8;
                  const isFav = favorites.has(product.id);

                  return (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product, idx)}
                      className="bg-white rounded-xl p-2.5 shadow-xs border border-slate-200 hover:border-indigo-400 transition cursor-pointer flex flex-col justify-between relative group"
                    >
                      {/* Recycling Inspector Badge */}
                      {showRecyclingInspector && (
                        <div className="absolute top-1 right-1 bg-purple-700 text-purple-100 text-[8px] font-mono px-1 rounded shadow-xs z-10">
                          VH #{simulatedViewHolderId}
                        </div>
                      )}

                      <div>
                        {/* Image */}
                        <div className="w-full h-20 rounded-lg bg-indigo-50/60 border border-indigo-100/70 flex items-center justify-center p-2 mb-2">
                          <ProductIcon iconKey={product.iconKey} size={32} className="text-indigo-600" />
                        </div>

                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {product.category}
                        </span>

                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-1 min-h-[32px]">
                          {product.name}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                        <span className="text-xs font-black text-emerald-600 font-mono">
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={(e) => handleToggleFavorite(product.id, e)}
                          className={`p-0.5 ${isFav ? 'text-rose-500' : 'text-slate-300'}`}
                        >
                          <Heart size={13} fill={isFav ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Android Toast Message Overlay (Task 7 Click Feedback) */}
          {toastMessage && (
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-slate-800/95 text-white text-xs px-4 py-2 rounded-full shadow-xl border border-slate-700 flex items-center gap-2 max-w-[85%] z-40 animate-in fade-in zoom-in-95 duration-150">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span className="truncate">{toastMessage}</span>
            </div>
          )}

          {/* Floating Action Button (Task 8 Challenge 3: Append Product) */}
          <button
            onClick={() => setShowAddModal(true)}
            className="absolute bottom-5 right-5 w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 active:scale-95 transition z-30 ring-2 ring-indigo-400/30"
            title="Task 8 Challenge 3: Add New Product"
          >
            <Plus size={22} />
          </button>

          {/* Bottom Android Navigation Pill */}
          <div className="h-4 bg-slate-900 flex items-center justify-center shrink-0">
            <div className="w-24 h-1 bg-slate-600 rounded-full"></div>
          </div>

          {/* Add Product Modal (Challenge 3 Dialog) */}
          {showAddModal && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-end justify-center z-50 animate-in fade-in">
              <div className="w-full bg-white rounded-t-3xl p-4 shadow-2xl border-t border-slate-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Task 8 Challenge: Add Product</h3>
                    <p className="text-[11px] text-slate-500">Appends item & calls notifyItemInserted()</p>
                  </div>
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={submitNewProduct} className="space-y-3 mt-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Product Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Logitech MX Master 3S"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="99.99"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        <option value="Accessories">Accessories</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Displays">Displays</option>
                        <option value="Audio">Audio</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Icon Graphic</label>
                    <div className="flex gap-2">
                      {(['keyboard', 'monitor', 'laptop', 'gaming'] as const).map(icon => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setNewIcon(icon)}
                          className={`flex-1 p-2 rounded-lg border flex items-center justify-center capitalize text-xs ${
                            newIcon === icon 
                              ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold' 
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <ProductIcon iconKey={icon} size={18} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition"
                    >
                      Insert Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Quick Status Legend below Emulator */}
      <div className="mt-3 text-center">
        <p className="text-xs text-slate-500 font-medium">
          Tap items to test <span className="font-semibold text-slate-700">Task 7 Click Handling</span> & check Logcat.
        </p>
      </div>
    </div>
  );
};
