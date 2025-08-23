// src/pages/PeriodicTable.jsx
import  { useState } from 'react';
import { MainLayout } from '../components/templates';
import { Button } from '../components/atoms';
import { useElementData } from '../hooks';
import './PeriodicTable.css';

const PeriodicTable = () => {
  const { 
    elements, 
    categories, 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    setSelectedCategory,
    sortBy,
    setSortBy,
    sortOrder,
    toggleSortOrder,
    selectedElement,
    setSelectedElement
  } = useElementData();

  const [layoutView, setLayoutView] = useState('table');

  return (
    <MainLayout activeTab="periodic">
      <div className="periodic-table-page">
        <div className="page-header">
          <h1>Periodic Table of Elements</h1>
          <p>Explore the organized system of chemical elements and their properties</p>
        </div>

        {/* Controls */}
        <div className="controls-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search elements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.replace(/-/g, ' ')}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-filter"
            >
              <option value="atomicNumber">Atomic Number</option>
              <option value="name">Name</option>
              <option value="symbol">Symbol</option>
              <option value="atomicMass">Atomic Mass</option>
            </select>

            <Button
              variant="secondary"
              size="small"
              onClick={() => toggleSortOrder(sortBy)}
            >
              {sortOrder === 'asc' ? '↑' : '↓'} Sort
            </Button>
          </div>

          <div className="view-controls">
            <Button
              variant={layoutView === 'table' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setLayoutView('table')}
            >
              Table View
            </Button>
            <Button
              variant={layoutView === 'list' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setLayoutView('list')}
            >
              List View
            </Button>
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>Showing {elements.length} of {elements.length} elements</p>
        </div>

        {/* Periodic Table */}
        <div className="periodic-table-container">
          {layoutView === 'table' ? (
            <div className="periodic-table">
              {/* This would be the actual periodic table grid layout */}
              <div className="table-placeholder">
                <h3>Interactive Periodic Table</h3>
                <p>This would display the complete periodic table with color-coded elements</p>
                <div className="element-grid">
                  {elements.slice(0, 20).map(element => (
                    <div
                      key={element.atomicNumber}
                      className={`element-cell ${element.category}`}
                      onClick={() => setSelectedElement(element)}
                    >
                      <div className="atomic-number">{element.atomicNumber}</div>
                      <div className="element-symbol">{element.symbol}</div>
                      <div className="element-name">{element.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="elements-list">
              {elements.map(element => (
                <div
                  key={element.atomicNumber}
                  className="element-item"
                  onClick={() => setSelectedElement(element)}
                >
                  <div className="element-basic">
                    <span className="element-atomic">{element.atomicNumber}</span>
                    <span className="element-symbol">{element.symbol}</span>
                    <span className="element-name">{element.name}</span>
                  </div>
                  <div className="element-details">
                    <span className="element-mass">{element.atomicMass}</span>
                    <span className="element-category">{element.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Element Details */}
        {selectedElement && (
          <div className="element-detail-modal">
            <div className="modal-content">
              <h2>{selectedElement.name} ({selectedElement.symbol})</h2>
              <div className="element-properties">
                <div className="property">
                  <label>Atomic Number:</label>
                  <span>{selectedElement.atomicNumber}</span>
                </div>
                <div className="property">
                  <label>Atomic Mass:</label>
                  <span>{selectedElement.atomicMass}</span>
                </div>
                <div className="property">
                  <label>Category:</label>
                  <span>{selectedElement.category}</span>
                </div>
                <div className="property">
                  <label>Electron Configuration:</label>
                  <span>{selectedElement.electronConfiguration}</span>
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={() => setSelectedElement(null)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PeriodicTable;