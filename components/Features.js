// components/Features.js
export default function Features() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              {/* Insert PDF Icon */}
              <svg className="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 3v9h9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Upload Textbooks</h3>
            <p className="mt-2 text-gray-600">Easily upload your textbooks and access them anytime.</p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              {/* Insert Notepad Icon */}
              <svg className="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 8h18M3 12h18m-8 8h8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Take Notes</h3>
            <p className="mt-2 text-gray-600">Keep track of your study notes alongside your textbooks.</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              {/* Insert Flashcard Icon */}
              <svg className="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 8h18M3 12h18m-8 8h8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Create Flashcards</h3>
            <p className="mt-2 text-gray-600">Generate and organize flashcards from your notes.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
