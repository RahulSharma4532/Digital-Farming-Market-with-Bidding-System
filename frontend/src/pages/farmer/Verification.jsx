import { useState } from 'react';
import { Shield, Upload, CheckCircle, Clock, AlertCircle, FileText, ChevronRight } from 'lucide-react';

export default function Verification() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('pending'); // pending, submitting, review, verified
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop here
  };

  const handleSubmit = () => {
    setStatus('submitting');
    setTimeout(() => {
      setStatus('review');
    }, 2000);
  };

  if (status === 'review') {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-yellow-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-12 h-12 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification In Progress</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          We have received your documents and our team is currently reviewing them. This process usually takes 24-48 hours.
        </p>
        <div className="bg-white p-6 rounded-xl shadow-sm border text-left max-w-lg mx-auto">
          <h3 className="font-bold mb-4">Application Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Application ID</span>
              <span className="font-mono font-medium">#KYC-2024-8832</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Submitted On</span>
              <span className="font-medium">Dec 15, 2024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Estimated Completion</span>
              <span className="font-medium">Dec 17, 2024</span>
            </div>
          </div>
          <button onClick={() => setStatus('verified')} className="mt-6 w-full py-2 text-sm text-gray-400 hover:text-gray-600">
            (Demo: Simulate Verified)
          </button>
        </div>
      </div>
    );
  }

  if (status === 'verified') {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">You are Verified!</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Congratulations! Your farm is now a verified seller on TerraFresh. You can start listing products and participating in auctions.
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-600" />
            <div className="text-left">
              <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
              <p className="font-bold text-green-700">Verified Seller</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm flex items-center gap-3">
            <FileText className="w-8 h-8 text-green-600" />
            <div className="text-left">
              <p className="text-xs text-gray-500 uppercase font-bold">License</p>
              <p className="font-bold text-green-700">Active</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Seller Verification</h1>
        <p className="text-gray-500">Complete the KYC process to start selling on the platform</p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center mb-12 relative">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10"></div>
        <div className={`absolute left-0 top-1/2 h-1 bg-green-500 -z-10 transition-all duration-500`} style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>

        <div className="flex justify-between w-full">
          <div className="flex flex-col items-center gap-2 bg-[#faf8f2]">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${step >= 1 ? 'bg-green-600' : 'bg-gray-300'}`}>1</div>
            <span className={`text-sm font-medium ${step >= 1 ? 'text-green-800' : 'text-gray-400'}`}>Basic Info</span>
          </div>
          <div className="flex flex-col items-center gap-2 bg-[#faf8f2]">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}>2</div>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-green-800' : 'text-gray-400'}`}>Farm Details</span>
          </div>
          <div className="flex flex-col items-center gap-2 bg-[#faf8f2]">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${step >= 3 ? 'bg-green-600' : 'bg-gray-300'}`}>3</div>
            <span className={`text-sm font-medium ${step >= 3 ? 'text-green-800' : 'text-gray-400'}`}>Documents</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold">Personal Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500" defaultValue="Rajesh Kumar" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input type="date" className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input type="tel" className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500" defaultValue="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PAN Card Number</label>
                <input type="text" className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500" placeholder="ABCDE1234F" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold">Farm Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                <input type="text" className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500" placeholder="e.g. Green Valley Farms" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Area (in Acres)</label>
                <input type="number" className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500" placeholder="5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Crop Type</label>
                <select className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500 bg-white">
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Grains</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Farm Address</label>
                <textarea className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500" rows="3"></textarea>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold">Document Upload</h2>
            <div className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                <h3 className="font-bold text-gray-700">Upload Identity Proof (Aadhar/Voter ID)</h3>
                <p className="text-sm text-gray-500 mb-4">Drag & drop or click to upload</p>
                <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200">Select File</button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
                <FileText className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                <h3 className="font-bold text-gray-700">Upload Land Records (7/12 Extract)</h3>
                <p className="text-sm text-gray-500 mb-4">Drag & drop or click to upload</p>
                <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200">Select File</button>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Ensure all documents are clear and readable. Blurred or cropped documents may lead to rejection.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 pt-6 border-t flex justify-between">
          <button
            onClick={() => setStep(prev => prev - 1)}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-bold text-gray-600 hover:bg-gray-100 ${step === 1 ? 'invisible' : ''}`}
          >
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(prev => prev + 1)}
              className="px-8 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-black transition-colors flex items-center gap-2"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

