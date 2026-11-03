import { Injectable } from '@nestjs/common';
import Decimal from 'decimal.js';

export interface QuoteItemInput {
  id?: string;
  description: string;
  amount: string;
  currency?: string;
  period: string;
}

export interface DiscountInput {
  id?: string;
  description: string;
  amount: string;
  currency?: string;
}

export type StackingPolicy = 'BEST_ELIGIBLE' | 'EXPLICIT' | 'NONE';

export interface PricingResult {
  subtotal: string;
  discount: string;
  total: string;
  minPayable: string;
  discountDescriptions: string[];
}

const ZERO = new Decimal(0);
const ONE = new Decimal(1);

@Injectable()
export class PricingService {
  // Pure, UI-independent. All monetary math is decimal-safe.
  calculateQuote(items: QuoteItemInput[], discounts: DiscountInput[], policy: StackingPolicy = 'EXPLICIT'): PricingResult {
    const decimal = (value: string, fallback = '0') => {
      try { return new Decimal(value ?? fallback); } catch { return new Decimal(fallback); }
    };

    const subtotal = items.reduce((sum, it) => sum.plus(decimal(it.amount)), ZERO);

    let discountValue: Decimal;
    const discountDescriptions: string[] = [];

    if (policy === 'EXPLICIT' && discounts.length > 0) {
      discountValue = discounts.reduce((s, d) => s.plus(decimal(d.amount)), ZERO);
      discountDescriptions.push(...discounts.map((d) => d.description));
    } else if (policy === 'BEST_ELIGIBLE' && discounts.length > 0) {
      let best = discounts[0];
      for (let i = 1; i < discounts.length; i++) {
        if (new Decimal(discounts[i].amount).gte(new Decimal(best.amount))) best = discounts[i];
      }
      discountValue = new Decimal(best.amount);
      discountDescriptions.push(best.description);
    } else {
      discountValue = ZERO;
    }

    // Enforce minimum payable of zero and cap discounts at the subtotal.
    const rawTotal = subtotal.minus(discountValue);
    const total = rawTotal.lt(ZERO) ? ZERO : rawTotal;
    const discountApplied = subtotal.minus(total);

    return {
      subtotal: subtotal.toString(),
      discount: discountApplied.toString(),
      total: total.toString(),
      minPayable: '0',
      discountDescriptions,
    };
  }

  enforceMinimum(total: string, min: string): string {
    const t = new Decimal(total);
    const m = new Decimal(min);
    return t.lt(m) ? m.toString() : t.toString();
  }
}
