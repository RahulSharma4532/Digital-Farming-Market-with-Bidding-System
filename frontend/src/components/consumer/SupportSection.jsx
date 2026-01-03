export default function SupportSection() {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6 mt-8">
            <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                    <svg className="w-6 h-6 text-blue-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-2">Need Help?</h3>
                    <p className="text-gray-600 mb-4">
                        Our customer support team is available 24/7 to help with any order-related queries.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="tel:8809903280" className="bg-white border border-blue-200 text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
                            <span>📞</span> Call: 880-990-3280
                        </a>
                        <a href="https://wa.me/918809903280" target="_blank" rel="noopener noreferrer" className="bg-white border border-blue-200 text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center gap-2">
                            <span>💬</span> WhatsApp Chat
                        </a>
                        <a href="mailto:rs8759652@gmail.com" className="bg-white border border-blue-200 text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center gap-2">
                            <span>📧</span> Email Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
