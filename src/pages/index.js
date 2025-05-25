import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Card from '../components/Card'; // Import the new Card component
import GroupingToggle from '../components/GroupingToggle'; // Import the new GroupingToggle component
import NavigationIndex from '../components/NavigationIndex'; // Import the new NavigationIndex component
import { sidebarItems } from '../data/sidebar_items'; // Import sidebarItems
import useIsBrowser from '@docusaurus/useIsBrowser';

// Function to extract the number from the label
const getNumber = (label) => {
    const match = label.match(/^(\d+)\./);
    return match ? parseInt(match[1], 10) : Infinity; // Return Infinity for items without a number
};

// Function to extract the first letter after the number and dot
const getFirstLetter = (label) => {
    const match = label.match(/^\d+\.\s*([А-Яа-яA-Za-z])/);
    if (match && match[1]) {
        return match[1].toUpperCase();
    }
    return '';
};


export default function Home() {

    const isBrowser = useIsBrowser();
    if (!isBrowser) {
        return <div>Loading...</div>; // Show a loading state while the browser is not ready
    }

    const [activeGroupType, setActiveGroupType] = useState('numerical'); // 'numerical' or 'alphabetical'

    const filteredSidebarItems = sidebarItems.filter(item => item.type === 'link');

    // Numerical Grouping Logic
    const sortedSidebarItemsNumerical = [...filteredSidebarItems].sort((a, b) => {
        const numA = parseInt(a.docId, 10);
        const numB = parseInt(b.docId, 10);
        return numA - numB;
    });

    const rangeSize = 50;
    const groupedItemsNumerical = sortedSidebarItemsNumerical.reduce((acc, item) => {
        const itemNumber = getNumber(item.label);
        if (itemNumber !== Infinity) {
            const groupIndex = Math.floor((itemNumber - 1) / rangeSize);
            const start = groupIndex * rangeSize + 1;
            const end = start + rangeSize - 1;
            const groupKey = `${start}-${end}`;

            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            acc[groupKey].push(item);
        }
        return acc;
    }, {});

    const sortedRanges = Object.keys(groupedItemsNumerical).sort((a, b) => {
        const startA = parseInt(a.split('-')[0], 10);
        const startB = parseInt(b.split('-')[0], 10);
        return startA - startB;
    });

    // Alphabetical Grouping Logic
    const groupedItemsAlphabetical = filteredSidebarItems.reduce((acc, item) => {
        const firstLetter = getFirstLetter(item.label);
        if (firstLetter) {
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(item);
        }
        return acc;
    }, {});

    const sortedLetters = Object.keys(groupedItemsAlphabetical).sort((a, b) => a.localeCompare(b, 'bg', { sensitivity: 'base' }));


    return (
        <Layout
            title={`Песни`}
            description="Индекс на песни">
            <main
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem',
                }}>
                <h1>Индекс на песни</h1>

                <GroupingToggle activeGroupType={activeGroupType} setActiveGroupType={setActiveGroupType} />

                <NavigationIndex
                    activeGroupType={activeGroupType}
                    sortedRanges={sortedRanges}
                    groupedItemsAlphabetical={groupedItemsAlphabetical}
                />

                {activeGroupType === 'numerical' && (
                    <>

                        {/* Render grouped cards numerically */}
                        {sortedRanges.map((range) => (
                            <section key={range} id={range} style={{ width: '100%', maxWidth: '1200px', marginBottom: '2rem' }}>
                                <h2 style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid var(--ifm-color-emphasis-300)', paddingBottom: '10px' }}>
                                    {range}
                                </h2>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                        gap: '20px',
                                        width: '100%',
                                        justifyContent: 'center',
                                    }}>
                                    {groupedItemsNumerical[range].map((item) => (
                                        <Card key={item.docId} item={item} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </>
                )}

                {activeGroupType === 'alphabetical' && (
                    <>

                        {/* Render grouped cards alphabetically */}
                        {sortedLetters.map((letter) => (
                            <section key={letter} id={letter} style={{ width: '100%', maxWidth: '1200px', marginBottom: '2rem' }}>
                                <h2 style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid var(--ifm-color-emphasis-300)', paddingBottom: '10px' }}>
                                    {letter}
                                </h2>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                        gap: '20px',
                                        width: '100%',
                                        justifyContent: 'center',
                                    }}>
                                    {groupedItemsAlphabetical[letter].map((item) => (
                                        <Card key={item.docId} item={item} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </>
                )}
            </main>
        </Layout>
    );
}