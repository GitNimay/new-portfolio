import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Audio
class AudioMock {
    loop: boolean;
    constructor(src: string) {
        this.loop = false;
    }
    play() {
        return Promise.resolve();
    }
    pause() {}
}

// vi.fn() creates a spy, but we need it to be a constructor.
// We can just assign the class to window.Audio if we don't need to spy on the constructor call itself,
// or use vi.fn().mockImplementation(() => new AudioMock()) if we treat it as a factory,
// but `new Audio()` expects a constructor.

// In jsdom, window.Audio might already exist.
// We should override it.
// The error `TypeError: ... is not a constructor` happens because `vi.fn().mockImplementation(...)` returns a function that returns an object, but `new` expects a constructor function.

// We can just use the class directly.
// @ts-ignore
window.Audio = AudioMock;

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();
