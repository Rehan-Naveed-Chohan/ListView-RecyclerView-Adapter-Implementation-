export interface AndroidSourceFile {
  id: string;
  name: string;
  path: string;
  language: 'java' | 'xml' | 'groovy';
  description: string;
  content: string;
}

export const ANDROID_SOURCE_FILES: AndroidSourceFile[] = [
  {
    id: 'product-model',
    name: 'Product.java',
    path: 'app/src/main/java/com/example/productcatalog/model/Product.java',
    language: 'java',
    description: 'Task 2 Deliverable: Encapsulated Product model with name, price, and image resource ID.',
    content: `package com.example.productcatalog.model;

/**
 * Task 2: Product Model Class
 * Represents a single product entity in the catalog.
 */
public class Product {
    private String name;
    private double price;
    private int imageResId;
    private String category;
    private String description;
    private boolean inStock;

    // Required Task 2 Constructor
    public Product(String name, double price, int imageResId) {
        this(name, price, imageResId, "General", "", true);
    }

    // Extended Constructor for Task 8 Open Challenges
    public Product(String name, double price, int imageResId, String category, String description, boolean inStock) {
        this.name = name;
        this.price = price;
        this.imageResId = imageResId;
        this.category = category;
        this.description = description;
        this.inStock = inStock;
    }

    // Getter methods required by Task 2
    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getImageResId() {
        return imageResId;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public boolean isInStock() {
        return inStock;
    }

    public String getFormattedPrice() {
        return String.format("$%.2f", price);
    }

    @Override
    public String toString() {
        return name + " - " + getFormattedPrice();
    }
}`
  },
  {
    id: 'product-adapter',
    name: 'ProductAdapter.java',
    path: 'app/src/main/java/com/example/productcatalog/adapter/ProductAdapter.java',
    language: 'java',
    description: 'Task 6 & 7 Deliverables: Custom RecyclerView.Adapter with ProductViewHolder and clean item click callback.',
    content: `package com.example.productcatalog.adapter;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.example.productcatalog.R;
import com.example.productcatalog.model.Product;
import java.util.List;

/**
 * Task 6 & 7: Custom RecyclerView Adapter & ViewHolder
 */
public class ProductAdapter extends RecyclerView.Adapter<ProductAdapter.ProductViewHolder> {

    private static final String TAG = "ProductAdapter";
    private final Context context;
    private final List<Product> productList;
    private OnItemClickListener listener;
    private int viewHolderCounter = 0;

    // Task 7: Interface for clean click handling
    public interface OnItemClickListener {
        void onItemClick(Product product, int position);
    }

    public void setOnItemClickListener(OnItemClickListener listener) {
        this.listener = listener;
    }

    public ProductAdapter(Context context, List<Product> productList) {
        this.context = context;
        this.productList = productList;
    }

    /**
     * Called ONLY when RecyclerView needs a brand new ViewHolder.
     * Inflates item_product.xml once per visible screen slot.
     */
    @NonNull
    @Override
    public ProductViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        viewHolderCounter++;
        Log.d(TAG, "onCreateViewHolder: Inflating item_product.xml -> Created VH #" + viewHolderCounter);

        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_product, parent, false);
        return new ProductViewHolder(view);
    }

    /**
     * Called frequently as items scroll onto screen.
     * Reuses existing ViewHolder, avoiding expensive layout inflation!
     */
    @Override
    public void onBindViewHolder(@NonNull ProductViewHolder holder, int position) {
        Product currentProduct = productList.get(position);
        Log.d(TAG, "onBindViewHolder: Binding pos " + position + " -> " + currentProduct.getName());

        holder.tvProductName.setText(currentProduct.getName());
        holder.tvProductPrice.setText(currentProduct.getFormattedPrice());
        holder.tvProductCategory.setText(currentProduct.getCategory());
        holder.ivProductImage.setImageResource(currentProduct.getImageResId());

        // Task 7: Clean item click handling
        holder.itemView.setOnClickListener(v -> {
            if (listener != null && holder.getAdapterPosition() != RecyclerView.NO_POSITION) {
                listener.onItemClick(currentProduct, holder.getAdapterPosition());
            }
        });
    }

    @Override
    public int getItemCount() {
        return productList != null ? productList.size() : 0;
    }

    /**
     * Task 6: Inner ViewHolder class that caches view references
     * so findViewById is never called repeatedly while scrolling.
     */
    public static class ProductViewHolder extends RecyclerView.ViewHolder {
        public ImageView ivProductImage;
        public TextView tvProductName;
        public TextView tvProductPrice;
        public TextView tvProductCategory;

        public ProductViewHolder(@NonNull View itemView) {
            super(itemView);
            ivProductImage = itemView.findViewById(R.id.ivProductImage);
            tvProductName = itemView.findViewById(R.id.tvProductName);
            tvProductPrice = itemView.findViewById(R.id.tvProductPrice);
            tvProductCategory = itemView.findViewById(R.id.tvProductCategory);
        }
    }
}`
  },
  {
    id: 'main-activity',
    name: 'MainActivity.java',
    path: 'app/src/main/java/com/example/productcatalog/MainActivity.java',
    language: 'java',
    description: 'Tasks 1, 3, 4, 7, 8: Host Activity demonstrating ListView vs RecyclerView with debugging and challenges.',
    content: `package com.example.productcatalog;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.example.productcatalog.adapter.ProductAdapter;
import com.example.productcatalog.model.Product;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    // Data collection (Task 2)
    private List<Product> productList;

    // Task 3: ListView components
    private ListView listViewProducts;
    private ArrayAdapter<String> listAdapter;

    // Task 4 & 6: RecyclerView components
    private RecyclerView recyclerViewProducts;
    private ProductAdapter productAdapter;
    private LinearLayoutManager linearLayoutManager;
    private GridLayoutManager gridLayoutManager;

    // Mode tracking
    private boolean isGridMode = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Task 1: Verify Logcat output
        Log.i(TAG, "onCreate: Activity started successfully!");
        Log.d(TAG, "Task 1: Logcat orientation verified for grading rubric.");

        // Task 2: Populate sample data (at least 8 products)
        initSampleProducts();

        // Task 3: Initialize Simple ListView
        initListView();

        // Tasks 4, 6, 7: Initialize RecyclerView with Adapter & LayoutManager
        initRecyclerView();

        // Task 8 Challenges: Setup Buttons
        setupChallengeButtons();
    }

    /**
     * Task 2: Create at least 8 sample Product objects using local drawables
     */
    private void initSampleProducts() {
        productList = new ArrayList<>();
        productList.add(new Product("Pixel 9 Pro Max", 999.00, R.drawable.ic_pixel_phone, "Smartphones", "Tensor G4", true));
        productList.add(new Product("Sony WH-1000XM5", 398.00, R.drawable.ic_headphones, "Audio", "Noise canceling", true));
        productList.add(new Product("MacBook Air M3", 1099.00, R.drawable.ic_laptop, "Laptops", "Liquid Retina", true));
        productList.add(new Product("Galaxy Watch 6 Classic", 299.99, R.drawable.ic_smartwatch, "Wearables", "Rotating bezel", true));
        productList.add(new Product("Sony Alpha 7 IV Camera", 2498.00, R.drawable.ic_camera, "Photography", "33MP Full-frame", true));
        productList.add(new Product("JBL Charge 5 Speaker", 179.95, R.drawable.ic_speaker, "Audio", "IP67 Waterproof", true));
        productList.add(new Product("iPad Pro 11-inch M4", 999.00, R.drawable.ic_tablet, "Tablets", "Ultra Retina OLED", true));
        productList.add(new Product("PlayStation 5 Slim", 499.99, R.drawable.ic_console, "Gaming", "Ultra-high SSD", false));

        Log.i(TAG, "initSampleProducts: Populated " + productList.size() + " products.");
    }

    /**
     * Task 3: Simple ListView using ArrayAdapter<String>
     */
    private void initListView() {
        listViewProducts = findViewById(R.id.listViewProducts);

        // Extract names for standard ArrayAdapter
        List<String> productNames = new ArrayList<>();
        for (Product p : productList) {
            productNames.add(p.getName() + " - " + p.getFormattedPrice());
        }

        listAdapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, productNames);
        listViewProducts.setAdapter(listAdapter);

        // Task 3: Item click listener
        listViewProducts.setOnItemClickListener((parent, view, position, id) -> {
            Product selected = productList.get(position);
            Toast.makeText(MainActivity.this, 
                "ListView Clicked: " + selected.getName(), 
                Toast.LENGTH_SHORT).show();
            Log.d(TAG, "ListView item clicked at pos " + position + ": " + selected.getName());
        });
    }

    /**
     * Tasks 4, 6, 7: Custom RecyclerView with LayoutManager & Adapter
     */
    private void initRecyclerView() {
        recyclerViewProducts = findViewById(R.id.recyclerViewProducts);

        // Task 4: Configure LayoutManager
        linearLayoutManager = new LinearLayoutManager(this);
        gridLayoutManager = new GridLayoutManager(this, 2);
        recyclerViewProducts.setLayoutManager(linearLayoutManager);

        // Task 6: Connect Adapter
        productAdapter = new ProductAdapter(this, productList);
        recyclerViewProducts.setAdapter(productAdapter);

        // Task 7: Clean item click handling with Toast feedback
        productAdapter.setOnItemClickListener((product, position) -> {
            String message = "RecyclerView Clicked: " + product.getName() + " (" + product.getFormattedPrice() + ")";
            Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
            Log.i(TAG, "ItemClick: User clicked " + product.getName() + " at position " + position);
        });
    }

    /**
     * Task 8: Open Challenges (Grid toggle & Append Product)
     */
    private void setupChallengeButtons() {
        Button btnToggleLayout = findViewById(R.id.btnToggleLayout);
        if (btnToggleLayout != null) {
            btnToggleLayout.setOnClickListener(v -> {
                isGridMode = !isGridMode;
                if (isGridMode) {
                    recyclerViewProducts.setLayoutManager(gridLayoutManager);
                    btnToggleLayout.setText("Switch to Linear");
                } else {
                    recyclerViewProducts.setLayoutManager(linearLayoutManager);
                    btnToggleLayout.setText("Switch to Grid (2-Col)");
                }
            });
        }

        FloatingActionButton fabAddProduct = findViewById(R.id.fabAddProduct);
        if (fabAddProduct != null) {
            fabAddProduct.setOnClickListener(v -> {
                // Task 8 Challenge 3: Append new Product and notify adapter
                Product newProduct = new Product(
                    "Keychron K2 Keyboard", 89.99, R.drawable.ic_keyboard, "Accessories", "Wireless 75%", true
                );
                productList.add(newProduct);
                int insertPos = productList.size() - 1;
                productAdapter.notifyItemInserted(insertPos);
                recyclerViewProducts.smoothScrollToPosition(insertPos);
                Toast.makeText(MainActivity.this, "Added: " + newProduct.getName(), Toast.LENGTH_SHORT).show();
            });
        }
    }
}`
  },
  {
    id: 'activity-main-xml',
    name: 'activity_main.xml',
    path: 'app/src/main/res/layout/activity_main.xml',
    language: 'xml',
    description: 'Tasks 3 & 4: Root activity layout showing tabs/views for ListView and RecyclerView.',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="#F8FAFC"
    tools:context=".MainActivity">

    <!-- Top App Bar Header -->
    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="#1E293B"
        app:title="Tech Catalog (Week 3 Lab)"
        app:titleTextColor="#FFFFFF" />

    <!-- Control Header for switching between ListView (Task 3) and RecyclerView (Tasks 4-8) -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:padding="8dp"
        android:background="#E2E8F0">

        <Button
            android:id="@+id/btnShowListView"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="ListView (Task 3)"
            android:textSize="12sp" />

        <Button
            android:id="@+id/btnShowRecyclerView"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:layout_marginStart="8dp"
            android:text="RecyclerView (Task 4-7)"
            android:textSize="12sp" />

        <Button
            android:id="@+id/btnToggleLayout"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:text="Grid / Linear"
            android:textSize="12sp" />
    </LinearLayout>

    <FrameLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1">

        <!-- Task 3: Simple ListView -->
        <ListView
            android:id="@+id/listViewProducts"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:visibility="gone"
            android:divider="#CBD5E1"
            android:dividerHeight="1dp" />

        <!-- Task 4: RecyclerView -->
        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/recyclerViewProducts"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:clipToPadding="false"
            android:padding="8dp"
            android:scrollbars="vertical"
            tools:listitem="@layout/item_product" />

        <!-- Task 8 Challenge 3: Floating Action Button to Add Product -->
        <com.google.android.material.floatingactionbutton.FloatingActionButton
            android:id="@+id/fabAddProduct"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="bottom|end"
            android:layout_margin="16dp"
            android:contentDescription="Add Product"
            app:srcCompat="@android:drawable/ic_input_add" />

    </FrameLayout>

</LinearLayout>`
  },
  {
    id: 'item-product-xml',
    name: 'item_product.xml',
    path: 'app/src/main/res/layout/item_product.xml',
    language: 'xml',
    description: 'Task 5 Deliverable: Reusable product row with ImageView, TextView for name, and TextView for price using dp & sp.',
    content: `<?xml version="1.0" encoding="utf-8"?>
<!-- Task 5: Design One Product Item -->
<androidx.cardview.widget.CardView 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginHorizontal="6dp"
    android:layout_marginVertical="6dp"
    android:foreground="?android:attr/selectableItemBackground"
    android:clickable="true"
    android:focusable="true"
    app:cardCornerRadius="12dp"
    app:cardElevation="3dp"
    app:cardBackgroundColor="#FFFFFF">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="12dp">

        <!-- Product Image (72dp x 72dp) -->
        <ImageView
            android:id="@+id/ivProductImage"
            android:layout_width="72dp"
            android:layout_height="72dp"
            android:background="#F1F5F9"
            android:scaleType="centerInside"
            android:padding="8dp"
            android:contentDescription="Product image thumbnail"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            tools:srcCompat="@android:drawable/ic_menu_camera" />

        <!-- Category Badge (Challenge 2) -->
        <TextView
            android:id="@+id/tvProductCategory"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="14dp"
            android:background="#E0E7FF"
            android:paddingHorizontal="8dp"
            android:paddingVertical="2dp"
            android:textColor="#3730A3"
            android:textSize="11sp"
            android:textStyle="bold"
            app:layout_constraintStart_toEndOf="@id/ivProductImage"
            app:layout_constraintTop_toTopOf="@id/ivProductImage"
            tools:text="Smartphones" />

        <!-- Product Name (TextView with 16sp and bold) -->
        <TextView
            android:id="@+id/tvProductName"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="14dp"
            android:layout_marginTop="4dp"
            android:layout_marginEnd="8dp"
            android:ellipsize="end"
            android:maxLines="1"
            android:textColor="#0F172A"
            android:textSize="16sp"
            android:textStyle="bold"
            app:layout_constraintEnd_toStartOf="@+id/ivChevron"
            app:layout_constraintStart_toEndOf="@id/ivProductImage"
            app:layout_constraintTop_toBottomOf="@id/tvProductCategory"
            tools:text="Pixel 9 Pro Max" />

        <!-- Product Price (TextView with 15sp) -->
        <TextView
            android:id="@+id/tvProductPrice"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="14dp"
            android:layout_marginTop="4dp"
            android:textColor="#16A34A"
            android:textSize="15sp"
            android:textStyle="bold"
            app:layout_constraintStart_toEndOf="@id/ivProductImage"
            app:layout_constraintTop_toBottomOf="@id/tvProductName"
            tools:text="$999.00" />

        <!-- Trailing action chevron icon -->
        <ImageView
            android:id="@+id/ivChevron"
            android:layout_width="20dp"
            android:layout_height="20dp"
            android:contentDescription="View details"
            android:tint="#94A3B8"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:srcCompat="@android:drawable/ic_media_play" />

    </androidx.constraintlayout.widget.ConstraintLayout>

</androidx.cardview.widget.CardView>`
  },
  {
    id: 'build-gradle',
    name: 'build.gradle (Module: app)',
    path: 'app/build.gradle',
    language: 'groovy',
    description: 'Task 4 Deliverable: Dependencies block including androidx.recyclerview and Material Components.',
    content: `plugins {
    id 'com.android.application'
}

android {
    namespace 'com.example.productcatalog'
    compileSdk 34

    defaultConfig {
        applicationId "com.example.productcatalog"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.cardview:cardview:1.0.0'

    // Task 4: Required RecyclerView dependency
    implementation 'androidx.recyclerview:recyclerview:1.3.2'

    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}`
  }
];
