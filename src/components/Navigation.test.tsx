import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { MusicProvider } from '@/context/MusicContext';

// The wrapper includes Router and MusicProvider
const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <MusicProvider>
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </MusicProvider>
    );
};

describe('Navigation', () => {
    it('renders the navigation properly', () => {
        renderWithProviders(<Navigation />);

        // Check if logo is present (assuming 'Nimesh' is part of the logo or nav)
        // Navigation.tsx has <AnimatedLogo />.
        // Let's assume AnimatedLogo renders some text or accessible element.
        // If not, we check for items.

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Experience')).toBeInTheDocument();
    });

    it('opens mobile menu on toggle click', () => {
        renderWithProviders(<Navigation />);

        // Find the toggle button. It's only visible on mobile (md:hidden).
        // It has <Menu /> icon.
        // Since we are in jsdom, layout CSS is not applied, so "md:hidden" doesn't hide it from access.
        // But we need to distinguish it from other buttons.
        // It is a button with class containing "md:hidden".

        const buttons = screen.getAllByRole('button');
        const mobileToggle = buttons.find(b => b.className.includes('md:hidden'));

        expect(mobileToggle).toBeDefined();
        if (mobileToggle) {
            fireEvent.click(mobileToggle);
        }

        // Now mobile menu should be open.
        // We can check if more nav items are present (desktop + mobile copies).
        const homeButtons = screen.getAllByText('Home');
        // Desktop has 1, Mobile has 1.
        expect(homeButtons.length).toBe(2);
    });
});
