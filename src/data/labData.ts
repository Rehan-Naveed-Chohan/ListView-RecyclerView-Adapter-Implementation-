import { ProductItem, LogEntry, LabTask } from '../types/androidLab';

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 1,
    name: 'Pixel 9 Pro Max',
    price: 999.00,
    category: 'Smartphones',
    imageResId: 'R.drawable.ic_pixel_phone',
    iconKey: 'smartphone',
    description: 'Tensor G4 processor with Super Actua OLED 120Hz display.',
    inStock: true,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5',
    price: 398.00,
    category: 'Audio',
    imageResId: 'R.drawable.ic_headphones',
    iconKey: 'headphones',
    description: 'Industry-leading noise canceling with dual processors and 8 mics.',
    inStock: true,
    rating: 4.9
  },
  {
    id: 3,
    name: 'MacBook Air M3',
    price: 1099.00,
    category: 'Laptops',
    imageResId: 'R.drawable.ic_laptop',
    iconKey: 'laptop',
    description: '13.6-inch Liquid Retina display, 18-hour battery, silent fanless design.',
    inStock: true,
    rating: 4.7
  },
  {
    id: 4,
    name: 'Galaxy Watch 6 Classic',
    price: 299.99,
    category: 'Wearables',
    imageResId: 'R.drawable.ic_smartwatch',
    iconKey: 'watch',
    description: 'Rotating bezel with advanced sleep coaching and ECG sensor.',
    inStock: true,
    rating: 4.6
  },
  {
    id: 5,
    name: 'Sony Alpha 7 IV Camera',
    price: 2498.00,
    category: 'Photography',
    imageResId: 'R.drawable.ic_camera',
    iconKey: 'camera',
    description: '33MP full-frame Exmor R CMOS sensor with 4K 60p recording.',
    inStock: true,
    rating: 4.9
  },
  {
    id: 6,
    name: 'JBL Charge 5 Bluetooth Speaker',
    price: 179.95,
    category: 'Audio',
    imageResId: 'R.drawable.ic_speaker',
    iconKey: 'speaker',
    description: 'IP67 waterproof and dustproof portable speaker with built-in powerbank.',
    inStock: true,
    rating: 4.5
  },
  {
    id: 7,
    name: 'iPad Pro 11-inch M4',
    price: 999.00,
    category: 'Tablets',
    imageResId: 'R.drawable.ic_tablet',
    iconKey: 'tablet',
    description: 'Ultra Retina XDR OLED display with breakthrough M4 performance.',
    inStock: true,
    rating: 4.8
  },
  {
    id: 8,
    name: 'PlayStation 5 Slim Console',
    price: 499.99,
    category: 'Gaming',
    imageResId: 'R.drawable.ic_console',
    iconKey: 'gaming',
    description: 'Ultra-high speed SSD, haptic feedback and Tempest 3D AudioTech.',
    inStock: false,
    rating: 4.9
  }
];

export const EXTRA_SAMPLE_PRODUCTS: ProductItem[] = [
  {
    id: 9,
    name: 'Keychron K2 Wireless Keyboard',
    price: 89.99,
    category: 'Accessories',
    imageResId: 'R.drawable.ic_keyboard',
    iconKey: 'keyboard',
    description: 'Compact 75% layout mechanical keyboard with Mac & Windows support.',
    inStock: true,
    rating: 4.7
  },
  {
    id: 10,
    name: 'Dell UltraSharp 27" 4K Monitor',
    price: 549.50,
    category: 'Displays',
    imageResId: 'R.drawable.ic_monitor',
    iconKey: 'monitor',
    description: 'IPS Black technology with 2000:1 contrast ratio and 90W USB-C hub.',
    inStock: true,
    rating: 4.8
  }
];

export const INITIAL_LOGCAT_ENTRIES: LogEntry[] = [
  {
    id: 'log-1',
    timestamp: '11:00:02.104',
    level: 'I',
    tag: 'MainActivity',
    message: 'onCreate: Initializing Product Catalog Activity'
  },
  {
    id: 'log-2',
    timestamp: '11:00:02.215',
    level: 'D',
    tag: 'MainActivity',
    message: 'Task 1 Verified: Debug message logged from student code successfully!'
  },
  {
    id: 'log-3',
    timestamp: '11:00:02.342',
    level: 'I',
    tag: 'ProductRepository',
    message: 'Loaded 8 local sample products from Product.java model'
  },
  {
    id: 'log-4',
    timestamp: '11:00:02.480',
    level: 'V',
    tag: 'ListViewAdapter',
    message: 'ArrayAdapter<String> initialized with 8 product titles'
  },
  {
    id: 'log-5',
    timestamp: '11:00:02.610',
    level: 'D',
    tag: 'RecyclerView',
    message: 'LayoutManager set to LinearLayoutManager(VERTICAL, reverseLayout=false)'
  },
  {
    id: 'log-6',
    timestamp: '11:00:02.730',
    level: 'D',
    tag: 'ProductAdapter',
    message: 'onCreateViewHolder() called -> Inflated item_product.xml (Created ViewHolder #0)'
  },
  {
    id: 'log-7',
    timestamp: '11:00:02.735',
    level: 'D',
    tag: 'ProductAdapter',
    message: 'onBindViewHolder() [VH #0] bound to Pos: 0 (Pixel 9 Pro Max - $999.00)'
  },
  {
    id: 'log-8',
    timestamp: '11:00:02.748',
    level: 'D',
    tag: 'ProductAdapter',
    message: 'onCreateViewHolder() called -> Inflated item_product.xml (Created ViewHolder #1)'
  },
  {
    id: 'log-9',
    timestamp: '11:00:02.752',
    level: 'D',
    tag: 'ProductAdapter',
    message: 'onBindViewHolder() [VH #1] bound to Pos: 1 (Sony WH-1000XM5 - $398.00)'
  }
];

export const LAB_TASKS_DATA: LabTask[] = [
  {
    id: 1,
    title: 'Android Studio Debugging Orientation',
    timeMinutes: 10,
    objective: 'Locate Logcat, Debug/Breakpoints, Layout Inspector and Profiler. Explain when each helps while debugging a dynamic list.',
    deliverable: '4 short tool explanations + screenshot or live demonstration of Logcat message.',
    completed: true,
    details: [
      'Logcat: Displays real-time system and app logs (Log.d, Log.i, Log.e). Crucial for checking lifecycle events, adapter position binding, and crash stack traces.',
      'Debug / Breakpoints: Pauses execution inside adapter methods like onBindViewHolder() or click listeners to inspect variable values in real-time.',
      'Layout Inspector: Renders a 3D view hierarchy inspection showing view bounds, padding/margins, and whether item_product layouts wrap correctly.',
      'Profiler: Measures memory allocations and CPU usage to detect memory leaks, excessive view inflations, or scrolling frame drops (jank).'
    ],
    keyConcept: 'Debugging & Instrumentation'
  },
  {
    id: 2,
    title: 'Product Model + Sample Data',
    timeMinutes: 15,
    objective: 'Create Product.java with name, price, and imageResId. Create at least 8 sample Product objects in MainActivity.',
    deliverable: 'Product.java source code + sample product ArrayList in MainActivity.',
    completed: true,
    details: [
      'Encapsulated Java model class with private fields: String name, double price, int imageResId.',
      'Added constructor, getters, and optional toString() / category / rating for clean architecture.',
      'Instantiated ArrayList<Product> in MainActivity containing at least 8 realistic tech catalog items.'
    ],
    keyConcept: 'OOP Encapsulation & Data Modeling'
  },
  {
    id: 3,
    title: 'Simple ListView',
    timeMinutes: 17,
    objective: 'Add a ListView to the layout and display product names using an ArrayAdapter<String>. Implement an OnItemClickListener.',
    deliverable: 'Working ListView with product names, scrollable items, and click feedback Toast.',
    completed: true,
    details: [
      'Extracted product names into a List<String>.',
      'Configured ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, productNames).',
      'Set listView.setOnItemClickListener((parent, view, position, id) -> Toast).',
      'Identified limitation: ListView requires custom getView() and manual ViewHolder caching to handle images and complex multi-view rows.'
    ],
    keyConcept: 'ArrayAdapter & AdapterView pattern'
  },
  {
    id: 4,
    title: 'Prepare RecyclerView',
    timeMinutes: 13,
    objective: 'Add RecyclerView to layout, verify androidx.recyclerview dependency, and configure LinearLayoutManager in MainActivity.',
    deliverable: 'RecyclerView present in layout with LinearLayoutManager configured in code.',
    completed: true,
    details: [
      'Verified dependency: implementation "androidx.recyclerview:recyclerview:1.3.2" in build.gradle.',
      'Added <androidx.recyclerview.widget.RecyclerView> to activity_main.xml with match_parent.',
      'Initialized in Java: recyclerView.setLayoutManager(new LinearLayoutManager(this)).'
    ],
    keyConcept: 'RecyclerView Architecture & LayoutManager'
  },
  {
    id: 5,
    title: 'Design One Product Item (item_product.xml)',
    timeMinutes: 20,
    objective: 'Create item_product.xml containing ImageView, product-name TextView, and price TextView using dp and sp units.',
    deliverable: 'item_product.xml layout with readable layout bounds and card/elevation.',
    completed: true,
    details: [
      'Used MaterialCardView / ConstraintLayout with 8dp elevation and 12dp corner radius.',
      'ImageView: 72dp x 72dp with android:scaleType="centerCrop".',
      'Product Name TextView: 16sp text size, bold typeface, singleLine ellipsis.',
      'Price TextView: 14sp text size, accent color formatting.'
    ],
    keyConcept: 'XML UI Design & Resolution Independence (dp/sp)'
  },
  {
    id: 6,
    title: 'Custom Adapter + ViewHolder (ProductAdapter.java)',
    timeMinutes: 20,
    objective: 'Create ProductAdapter extending RecyclerView.Adapter. Implement onCreateViewHolder, onBindViewHolder, and getItemCount.',
    deliverable: 'ProductAdapter.java with ViewHolder pattern showing 8+ products with images and text.',
    completed: true,
    details: [
      'ProductViewHolder caches references to ImageView and TextViews via findViewById once upon inflation.',
      'onCreateViewHolder: Inflates item_product.xml and returns a new ProductViewHolder.',
      'onBindViewHolder: Binds current Product data to cached views based on position.',
      'getItemCount: Returns productList.size().'
    ],
    keyConcept: 'ViewHolder Pattern & View Recycling'
  },
  {
    id: 7,
    title: 'Item Click Handling',
    timeMinutes: 10,
    objective: 'Implement a clean item-click listener interface. Display product name and price upon tapping an item.',
    deliverable: 'Working click response displaying Toast / info update with correct item details.',
    completed: true,
    details: [
      'Defined OnItemClickListener interface inside ProductAdapter.',
      'Attached click listener to holder.itemView inside onBindViewHolder or ViewHolder constructor.',
      'Triggered Toast.makeText(context, "Selected: " + product.getName() + " - $" + product.getPrice(), Toast.LENGTH_SHORT).show().'
    ],
    keyConcept: 'Interface Callbacks & Event Delegation'
  },
  {
    id: 8,
    title: 'Comparison + Open Challenges',
    timeMinutes: 10,
    objective: 'Write 4-6 lines comparing ListView vs RecyclerView. Implement at least one open challenge.',
    deliverable: 'Comparison text + completed open challenge implementation.',
    completed: true,
    details: [
      'Comparison: ListView requires manual ViewHolder pattern in getView(), whereas RecyclerView strictly enforces the ViewHolder pattern at compile-time. RecyclerView decouples view positioning via LayoutManager (Linear, Grid, Staggered) and supports item animations (ItemAnimator) and DiffUtil.',
      'Challenge 1 Implemented: 2-column GridLayoutManager toggle live in app.',
      'Challenge 2 Implemented: Category badge tags & filter chips.',
      'Challenge 3 Implemented: Add Product dialog with notifyItemInserted(position).',
      'Challenge 4 Implemented: Polished Material CardView with elevation, ripple, and favorite toggle.'
    ],
    keyConcept: 'Architectural Trade-offs & Advanced RecyclerView'
  },
  {
    id: 9,
    title: 'Testing, Submission & Reflection',
    timeMinutes: 5,
    objective: 'Run full verification checklist. Answer three core reflection questions and generate final lab report.',
    deliverable: 'Self-assessment evaluation (20/20 rubric) and complete reflection answers.',
    completed: true,
    details: [
      'Verified: 8+ products loaded, images bound accurately, smooth scroll without data crossover.',
      'Answer 1: The Adapter serves as the bridge between raw data source (List<Product>) and visual View components.',
      'Answer 2: RecyclerView is efficient because it reuses detached ViewHolders from a scrap pool, eliminating continuous expensive XML inflations and findViewById calls during scrolling.',
      'Answer 3: Primary implementation difficulty: Understanding the separation of duties between onCreateViewHolder (layout inflation) and onBindViewHolder (data mapping).'
    ],
    keyConcept: 'Quality Assurance & Technical Reflection'
  }
];

export const COMPARISON_ANALYSIS = {
  summary: `ListView and RecyclerView both display scrollable collections, but their underlying architectures differ fundamentally:
1. Adapter & ViewHolder: In ListView, using a ViewHolder is optional and must be manually coded inside getView(); forgetting it causes terrible scroll stutter. In RecyclerView, the ViewHolder pattern is strictly mandatory and enforced by the abstract generic class.
2. Layout Flexibility: ListView is locked to a single vertical stack. RecyclerView completely decouples layout calculation to a LayoutManager, allowing instant switching between LinearLayoutManager (vertical/horizontal), GridLayoutManager, and StaggeredGridLayoutManager without altering the adapter.
3. Item Animations & Efficiency: RecyclerView features built-in item animations (DefaultItemAnimator) and granular notifyItemInserted/Removed/Changed updates via DiffUtil, whereas ListView forces full-dataset re-rendering with notifyDataSetChanged.
4. Suitable Use Cases: ListView is only suitable for tiny, static legacy menus with basic string arrays. RecyclerView is the modern standard for dynamic, high-performance, and complex data lists.`,
  bulletPoints: [
    {
      feature: 'ViewHolder Pattern',
      listView: 'Optional (developers often forgot it, causing severe lag)',
      recyclerView: 'Mandatory (enforced by RecyclerView.Adapter<VH>)'
    },
    {
      feature: 'Layout Flexibility',
      listView: 'Vertical list only',
      recyclerView: 'Decoupled (LinearLayoutManager, GridLayoutManager, StaggeredGridLayoutManager)'
    },
    {
      feature: 'View Recycling Efficiency',
      listView: 'Recycles View objects, but still requires repeated findViewById if un-cached',
      recyclerView: 'Recycles ViewHolders with cached view references; maintains a RecycledViewPool'
    },
    {
      feature: 'Animations',
      listView: 'No native item animation support',
      recyclerView: 'Built-in ItemAnimator with smooth insert, remove, and move animations'
    },
    {
      feature: 'Dataset Notifications',
      listView: 'notifyDataSetChanged() (re-renders all visible rows)',
      recyclerView: 'Granular notifications: notifyItemInserted(), notifyItemRemoved(), DiffUtil'
    },
    {
      feature: 'Item Separator / Decoration',
      listView: 'android:divider in XML attribute',
      recyclerView: 'ItemDecoration class allows custom borders, spacers, and headers'
    }
  ]
};

export const REFLECTION_ANSWERS = {
  q1: {
    question: 'What does the Adapter do?',
    answer: 'The Adapter acts as an architectural bridge between the underlying data collection (such as an ArrayList<Product>) and the UI presentation (the AdapterView or RecyclerView). It handles creating view instances, recycling off-screen views, binding specific item data to individual view fields, and reporting the dataset count to the layout engine.'
  },
  q2: {
    question: 'Why is RecyclerView efficient?',
    answer: 'RecyclerView is significantly more memory and CPU efficient because of its Scrapped and Recycled View Pools. When an item scrolls off the top of the screen, its entire ViewHolder is preserved instead of being destroyed. When a new item appears at the bottom, RecyclerView grabs the existing ViewHolder, skips XML layout inflation and repeated findViewById traversal, and directly invokes onBindViewHolder() to update the text and images. This keeps frame rendering consistently at 60/120 FPS.'
  },
  q3: {
    question: 'What was your main implementation difficulty?',
    answer: 'The main implementation difficulty was mastering the separation of responsibilities between onCreateViewHolder() and onBindViewHolder(), as well as setting up a decoupled OnItemClickListener interface to cleanly pass the clicked product from the ViewHolder back to the MainActivity context without leaking view references.'
  }
};
