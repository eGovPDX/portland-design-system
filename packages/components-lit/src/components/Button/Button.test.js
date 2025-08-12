import { expect, test } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import '../Button.js';

test('portland-button renders with default properties', async () => {
  const el = await fixture(html`
    <portland-button>Test Button</portland-button>
  `);

  expect(el.variant).toBe('default');
  expect(el.size).toBe('default');
  expect(el.disabled).toBe(false);
  expect(el.type).toBe('button');
});

test('portland-button renders with custom variant', async () => {
  const el = await fixture(html`
    <portland-button variant="secondary">Secondary Button</portland-button>
  `);

  expect(el.variant).toBe('secondary');
  
  const button = el.shadowRoot.querySelector('button');
  expect(button.classList.contains('usa-button--secondary')).toBe(true);
});

test('portland-button handles disabled state', async () => {
  const el = await fixture(html`
    <portland-button disabled>Disabled Button</portland-button>
  `);

  expect(el.disabled).toBe(true);
  
  const button = el.shadowRoot.querySelector('button');
  expect(button.disabled).toBe(true);
  expect(button.getAttribute('aria-disabled')).toBe('true');
});

test('portland-button dispatches custom click event', async () => {
  const el = await fixture(html`
    <portland-button>Click me</portland-button>
  `);

  let eventFired = false;
  let eventDetail = null;

  el.addEventListener('portland-button-click', (e) => {
    eventFired = true;
    eventDetail = e.detail;
  });

  const button = el.shadowRoot.querySelector('button');
  button.click();

  expect(eventFired).toBe(true);
  expect(eventDetail).toBeDefined();
  expect(eventDetail.originalEvent).toBeDefined();
});

test('portland-button prevents click when disabled', async () => {
  const el = await fixture(html`
    <portland-button disabled>Disabled Button</portland-button>
  `);

  let eventFired = false;

  el.addEventListener('portland-button-click', () => {
    eventFired = true;
  });

  const button = el.shadowRoot.querySelector('button');
  button.click();

  expect(eventFired).toBe(false);
});

test('portland-button renders with icons', async () => {
  const el = await fixture(html`
    <portland-button start-icon="fas fa-home" end-icon="fas fa-arrow-right">
      Button with Icons
    </portland-button>
  `);

  expect(el.startIcon).toBe('fas fa-home');
  expect(el.endIcon).toBe('fas fa-arrow-right');

  const startIcon = el.shadowRoot.querySelector('.fa-icon--left');
  const endIcon = el.shadowRoot.querySelector('.fa-icon--right');
  
  expect(startIcon).toBeDefined();
  expect(endIcon).toBeDefined();
});
