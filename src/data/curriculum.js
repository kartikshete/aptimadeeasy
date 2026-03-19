export const categories = [
    {
        id: 'quant',
        title: 'Quantitative Aptitude',
        description: 'Master numerical ability and mathematical reasoning.',
        icon: 'Calculator',
        color: '#6366f1',
        sections: [
            {
                title: 'Arithmetic & Basic Mathematics',
                topics: [
                    { id: 'num_sys', title: 'Number Systems', count: 100, icon: 'Hash' },
                    { id: 'simpl', title: 'Simplification', count: 100, icon: 'Zap' },
                    { id: 'perc', title: 'Percentages', count: 100, icon: 'Percent' },
                    { id: 'ratio', title: 'Ratio & Proportion', count: 100, icon: 'Scale' },
                    { id: 'avg', title: 'Averages', count: 100, icon: 'BarChart' },
                    { id: 'prof_loss', title: 'Profit & Loss', count: 100, icon: 'TrendingUp' },
                    { id: 'interest', title: 'Simple & Compound Interest', count: 100, icon: 'Coins' },
                    { id: 'speed', title: 'Time, Speed & Distance', count: 100, icon: 'Timer' },
                    { id: 'work', title: 'Time & Work', count: 100, icon: 'Briefcase' },
                    { id: 'mixture', title: 'Mixtures & Alligation', count: 100, icon: 'FlaskConical' },
                    { id: 'partnership', title: 'Partnership Problems', count: 100, icon: 'Users' },
                ]
            },
            {
                title: 'Advanced Quant Concepts',
                topics: [
                    { id: 'algebra', title: 'Algebra', count: 100, icon: 'Variable' },
                    { id: 'progression', title: 'Progressions (AP, GP)', count: 100, icon: 'ChevronRight' },
                    { id: 'surds', title: 'Surds & Indices', count: 100, icon: 'SquareCode' },
                    { id: 'logs', title: 'Logarithms', count: 100, icon: 'Binary' },
                    { id: 'perm_comb', title: 'Permutations & Combinations', count: 100, icon: 'ListOrdered' },
                    { id: 'prob', title: 'Probability', count: 100, icon: 'Dices' },
                    { id: 'coord_geo', title: 'Coordinate Geometry', count: 100, icon: 'Grid' },
                    { id: 'geometry', title: 'Geometry & Mensuration', count: 100, icon: 'Shapes' },
                    { id: 'di', title: 'Data Interpretation', count: 100, icon: 'PieChart' },
                ]
            }
        ]
    },
    {
        id: 'logical',
        title: 'Logical Reasoning',
        description: 'Sharpen your analytical and pattern-recognition skills.',
        icon: 'BrainCircuit',
        color: '#a855f7',
        sections: [
            {
                title: 'Pattern & Sequence',
                topics: [
                    { id: 'num_series', title: 'Number Series', count: 100, icon: 'Binary' },
                    { id: 'letter_series', title: 'Letter & Symbol Series', count: 100, icon: 'Type' },
                    { id: 'analogies', title: 'Analogies', count: 100, icon: 'GitCompare' },
                    { id: 'odd_one', title: 'Odd One Out', count: 100, icon: 'Target' },
                ]
            },
            {
                title: 'Reasoning Concepts',
                topics: [
                    { id: 'coding_decoding', title: 'Coding-Decoding', count: 100, icon: 'Lock' },
                    { id: 'blood_relations', title: 'Blood Relations', count: 100, icon: 'Heart' },
                    { id: 'direction', title: 'Direction Sense', count: 100, icon: 'Compass' },
                    { id: 'syllogisms', title: 'Syllogisms', count: 100, icon: 'CheckCircle' },
                    { id: 'classification', title: 'Classification', count: 100, icon: 'Layers' },
                    { id: 'inequalities', title: 'Inequalities', count: 100, icon: 'Divide' },
                    { id: 'input_output', title: 'Input-Output', count: 100, icon: 'ArrowRightLeft' },
                    { id: 'data_suff', title: 'Data Sufficiency', count: 100, icon: 'ClipboardCheck' },
                ]
            },
            {
                title: 'Puzzle Types',
                topics: [
                    { id: 'seating', title: 'Seating Arrangements', count: 100, icon: 'Layout' },
                    { id: 'scheduling', title: 'Scheduling Puzzles', count: 100, icon: 'Calendar' },
                    { id: 'games', title: 'Logical Games', count: 100, icon: 'Gamepad2' },
                    { id: 'venn', title: 'Venn Diagrams', count: 100, icon: 'Circle' },
                    { id: 'assumptions', title: 'Statements & Assumptions', count: 100, icon: 'MessageSquare' },
                ]
            }
        ]
    },
    {
        id: 'verbal',
        title: 'Verbal Ability',
        description: 'Improve your language proficiency and comprehension.',
        icon: 'Languages',
        color: '#f43f5e',
        sections: [
            {
                title: 'Comprehension & Grammar',
                topics: [
                    { id: 'rc', title: 'Reading Comprehension', count: 100, icon: 'BookOpen' },
                    { id: 'error_spot', title: 'Error Spotting', count: 100, icon: 'Search' },
                    { id: 'sv_agreement', title: 'Subject-Verb Agreement', count: 100, icon: 'CheckSquare' },
                    { id: 'parts_speech', title: 'Parts of Speech', count: 100, icon: 'Puzzle' },
                    { id: 'tenses', title: 'Tenses & Grammar', count: 100, icon: 'History' },
                ]
            },
            {
                title: 'Vocabulary & Usage',
                topics: [
                    { id: 'syn_ant', title: 'Synonyms & Antonyms', count: 100, icon: 'Repeat' },
                    { id: 'idioms', title: 'Idioms & Phrases', count: 100, icon: 'Quote' },
                    { id: 'completion', title: 'Sentence Completion', count: 100, icon: 'Edit3' },
                ]
            },
            {
                title: 'Logical & Structural',
                topics: [
                    { id: 'para_jumbles', title: 'Para Jumbles', count: 100, icon: 'Shuffle' },
                    { id: 'cloze', title: 'Cloze Tests', count: 100, icon: 'FileText' },
                    { id: 'rearrangement', title: 'Sentence Rearrangement', count: 100, icon: 'AlignLeft' },
                    { id: 'critical', title: 'Critical Reasoning', count: 100, icon: 'AlertCircle' },
                ]
            }
        ]
    }
];
