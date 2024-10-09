const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    pdf: {
        type: String
    },
    ytplaylist: {
        type: String
    },
    title: {
        type: String
    }
});

const ChapterSchema = new Schema({
    chapterName: {
        type: String,
        required: true
    },
    resources: [ResourceSchema]
});

const SubjectSchema = new Schema({
    subjectName: {
        type: String,
        required: true
    },
    chapters: [ChapterSchema]
});

const SemesterSchema = new Schema({
    semesterNumber: {
        type: Number,
        required: true,
    },
    subjects: [SubjectSchema]
});

const BranchSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    semesters: [SemesterSchema]
});

// Custom methods

BranchSchema.methods.addSemester = async function (semesterNumber) {
    if (this.semesters.find(sem => sem.semesterNumber === semesterNumber)) {
        throw new Error('Semester already exists');
    }
    this.semesters.push({ semesterNumber, subjects: [] });
    return this.save();
};

BranchSchema.methods.addSubject = async function (semesterNumber, subjectName) {
    const semester = this.semesters.find(sem => sem.semesterNumber === semesterNumber);
    if (!semester) {
        throw new Error('Semester not found');
    }
    if (semester.subjects.find(sub => sub.name === subjectName)) {
        throw new Error('Subject already exists in this semester');
    }
    semester.subjects.push({ name: subjectName, chapters: [] });
    return this.save();
};

BranchSchema.methods.addChapter = async function (semesterNumber, subjectName, chapterNumber, chapterTitle) {
    const semester = this.semesters.find(sem => sem.semesterNumber === semesterNumber);
    if (!semester) {
        throw new Error('Semester not found');
    }
    const subject = semester.subjects.find(sub => sub.name === subjectName);
    if (!subject) {
        throw new Error('Subject not found');
    }
    if (subject.chapters.find(chap => chap.chapterNumber === chapterNumber)) {
        throw new Error('Chapter number already exists in this subject');
    }
    subject.chapters.push({ chapterNumber, title: chapterTitle, resources: [] });
    return this.save();
};

BranchSchema.methods.addResource = async function (semesterNumber, subjectName, chapterNumber, resource) {
    const semester = this.semesters.find(sem => sem.semesterNumber === semesterNumber);
    if (!semester) {
        throw new Error('Semester not found');
    }
    const subject = semester.subjects.find(sub => sub.name === subjectName);
    if (!subject) {
        throw new Error('Subject not found');
    }
    const chapter = subject.chapters.find(chap => chap.chapterNumber === chapterNumber);
    if (!chapter) {
        throw new Error('Chapter not found');
    }
    if (chapter.resources.find(res => res.url === resource.url)) {
        throw new Error('Resource with this URL already exists in this chapter');
    }
    chapter.resources.push(resource);
    return this.save();
};

const Resource = mongoose.model('Resource', BranchSchema);

module.exports = Resource;