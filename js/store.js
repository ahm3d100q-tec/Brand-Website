/* Live Server only serves static files; all data requests must go to Express. */
const ACE_API_URL = window.ACE_API_URL || `${window.location.protocol}//${window.location.hostname === '127.0.0.1' ? '127.0.0.1' : 'localhost'}:3000`;
const ACE = {
  get cart() { try { return JSON.parse(localStorage.getItem('ace_cart')) || []; } catch { return []; } },
  set cart(items) { localStorage.setItem('ace_cart', JSON.stringify(items)); this.updateCartCount(); },
  money: value => `EGP ${Number(value).toLocaleString('en-EG', { maximumFractionDigits: 0 })}`,
  updateCartCount() { document.querySelectorAll('#cartCount').forEach(el => el.textContent = this.cart.reduce((n, i) => n + i.quantity, 0)); },
  async request(url, options = {}) { let res; try { res = await fetch(url.startsWith('http') ? url : `${ACE_API_URL}${url}`, { credentials: 'include', headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options }); } catch { throw new Error('The account server is unavailable. Start the API at http://localhost:3000 and try again.'); } const data = await res.json().catch(() => ({})); if (!res.ok) throw new Error(data.error || `Request failed (${res.status}). Please try again.`); return data; },
  async user() { try { return (await this.request('/api/auth/me')).user; } catch { return null; } },
  async initNav() { this.updateCartCount(); const account = document.querySelector('[data-account]'); if (!account) return; const user = await this.user(); if (user) { account.href = '/pages/account.html'; account.innerHTML = `<i class="fa-regular fa-user"></i><span>${user.name.split(' ')[0]}</span>`; } else { account.href = '/pages/login.html'; } },
  add(item) { const cart = this.cart; const existing = cart.find(i => i.name === item.name); existing ? existing.quantity++ : cart.push({ ...item, quantity: 1 }); this.cart = cart; }
};
document.addEventListener('DOMContentLoaded', () => ACE.initNav());
