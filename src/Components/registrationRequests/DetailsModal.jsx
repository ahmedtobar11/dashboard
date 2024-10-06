import { useEffect } from "react";
import Button from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";

function DetailsModal({ isOpen, onClose, data }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const DetailRow = ({ label, value }) => (
    <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100">
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className="text-sm text-gray-800">{value}</div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border-2 border-main"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Applicant Details
              </h2>
              <Button
                text="x"
                size="lg"
                onClick={onClose}
                className="!min-w-0 !w-8 !h-8 hover:bg-red-100 hover:text-red-600 transition-colors"
                variant="outline"
              />
            </div>

            <div className="space-y-2">
              <DetailRow label="Full Name" value={data.name} />
              <DetailRow label="Mobile" value={data.mobile} />
              <DetailRow label="Email" value={data.email} />
              <DetailRow label="City of Birthplace" value={data.birthCity} />
              <DetailRow label="Faculty" value={data.faculty} />
              <DetailRow label="University" value={data.university} />
              <DetailRow label="Track Name" value={data.track} />
              <DetailRow label="Branch" value={data.branch} />
              <DetailRow label="Program" value={data.program} />
              <DetailRow label="Graduation Year" value={data.graduationYear} />
              <DetailRow label="Intake" value={data.intake} />
              <DetailRow
                label="Teaching Branches"
                value={data.teachingBranches?.join(", ")}
              />
              <DetailRow
                label="Preferred Courses"
                value={data.preferredCourses?.join(", ")}
              />
              <DetailRow label="Job Title" value={data.jobTitle} />
              <DetailRow label="Company Name" value={data.companyName} />
              <DetailRow label="Years of Experience" value={data.experience} />
              <DetailRow label="Worked as Freelancer" value={data.freelancer} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DetailsModal;
