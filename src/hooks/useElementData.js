// src/hooks/useElementData.js
import { useState, useMemo, useCallback } from "react";
import { elementData, elementCategories } from "../utils/elementData";

const useElementData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("atomicNumber");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedElement, setSelectedElement] = useState(null);

  // Filter and sort elements
  const filteredElements = useMemo(() => {
    let filtered = elementData;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (element) =>
          element.name.toLowerCase().includes(term) ||
          element.symbol.toLowerCase().includes(term) ||
          element.atomicNumber.toString().includes(term)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (element) => element.category === selectedCategory
      );
    }

    // Sort elements
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);

  // Get element by atomic number
  const getElementByAtomicNumber = useCallback((atomicNumber) => {
    return (
      elementData.find((element) => element.atomicNumber === atomicNumber) ||
      null
    );
  }, []);

  // Get element by symbol
  const getElementBySymbol = useCallback((symbol) => {
    return (
      elementData.find(
        (element) => element.symbol.toLowerCase() === symbol.toLowerCase()
      ) || null
    );
  }, []);

  // Get elements by category
  const getElementsByCategory = useCallback((category) => {
    return elementData.filter((element) => element.category === category);
  }, []);

  // Get periodic table layout
  const getPeriodicTableLayout = useCallback(() => {
    const layout = [];
    let currentPeriod = 1;
    let currentGroup = 1;

    elementData.forEach((element) => {
      if (element.period > currentPeriod) {
        currentPeriod = element.period;
        currentGroup = 1;
      }

      if (!layout[currentPeriod - 1]) {
        layout[currentPeriod - 1] = [];
      }

      // Handle lanthanides and actinides
      if (element.period === 6 && element.group === 3) {
        // Lanthanides
        if (!layout[8]) layout[8] = [];
        layout[8].push(element);
      } else if (element.period === 7 && element.group === 3) {
        // Actinides
        if (!layout[9]) layout[9] = [];
        layout[9].push(element);
      } else {
        // Regular elements
        while (layout[currentPeriod - 1].length < element.group - 1) {
          layout[currentPeriod - 1].push(null); // Empty cell
        }
        layout[currentPeriod - 1][element.group - 1] = element;
      }
    });

    return layout;
  }, []);

  // Search elements with debounce
  const searchElements = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Toggle sort order
  const toggleSortOrder = useCallback(
    (newSortBy) => {
      if (sortBy === newSortBy) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortBy(newSortBy);
        setSortOrder("asc");
      }
    },
    [sortBy]
  );

  // Element statistics
  const elementStats = useMemo(() => {
    const stats = {
      total: elementData.length,
      byCategory: {},
      averageAtomicMass: 0,
      heaviestElement: null,
      lightestElement: null,
    };

    let totalMass = 0;
    let maxMass = -Infinity;
    let minMass = Infinity;

    elementData.forEach((element) => {
      // Count by category
      stats.byCategory[element.category] =
        (stats.byCategory[element.category] || 0) + 1;

      // Calculate average mass
      totalMass += element.atomicMass;

      // Find heaviest and lightest
      if (element.atomicMass > maxMass) {
        maxMass = element.atomicMass;
        stats.heaviestElement = element;
      }

      if (element.atomicMass < minMass) {
        minMass = element.atomicMass;
        stats.lightestElement = element;
      }
    });

    stats.averageAtomicMass = totalMass / elementData.length;

    return stats;
  }, []);

  return {
    // State
    elements: filteredElements,
    allElements: elementData,
    categories: elementCategories,
    searchTerm,
    selectedCategory,
    sortBy,
    sortOrder,
    selectedElement,
    stats: elementStats,

    // Actions
    setSearchTerm,
    setSelectedCategory,
    setSortBy,
    setSortOrder,
    setSelectedElement,
    searchElements,
    toggleSortOrder,
    getElementByAtomicNumber,
    getElementBySymbol,
    getElementsByCategory,
    getPeriodicTableLayout,

    // Utilities
    isEmpty: filteredElements.length === 0,
    totalResults: filteredElements.length,
  };
};

export default useElementData;
