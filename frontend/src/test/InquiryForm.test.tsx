import { describe, it, expect } from 'vitest';

// Email validation regex (same as InquiryForm)
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

describe('Email validation', () => {
  it('accepts standard emails', () => {
    expect(emailRegex.test('user@example.com')).toBe(true);
    expect(emailRegex.test('john.doe@company.org')).toBe(true);
  });

  it('accepts emails with + tags', () => {
    expect(emailRegex.test('user+tag@example.com')).toBe(true);
  });

  it('accepts emails with multiple subdomains', () => {
    expect(emailRegex.test('user@mail.example.co.uk')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(emailRegex.test('')).toBe(false);
    expect(emailRegex.test('not-an-email')).toBe(false);
    expect(emailRegex.test('@example.com')).toBe(false);
  });
});
