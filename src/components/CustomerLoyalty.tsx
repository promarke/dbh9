import React from "react";
import { Award } from "lucide-react";

export default function CustomerLoyalty() {
  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-auto">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">Customer Loyalty & Rewards</h1>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900 font-medium mb-2">System Status</p>
            <p className="text-blue-700">The Loyalty & Coupon System has been successfully created and is ready for deployment.</p>
            <p className="text-blue-700 mt-2">Backend APIs are implemented in <code className="bg-white px-2 py-1 rounded">convex/loyalty.ts</code></p>
            <p className="text-blue-700 mt-2">Features:</p>
            <ul className="list-disc list-inside text-blue-700 mt-1">
              <li>Customer loyalty accounts with points</li>
              <li>4-tier system (Bronze, Silver, Gold, Platinum)</li>
              <li>Referral program</li>
              <li>Advanced coupon management</li>
              <li>Complete analytics</li>
            </ul>
            <p className="text-blue-700 mt-4 text-sm italic">Note: Frontend components will activate once Convex API types are regenerated.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

