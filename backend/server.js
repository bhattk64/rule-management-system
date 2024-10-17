const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://bhattn245:nikhil@cluster0.bxdfb.mongodb.net/ZEOTAPSDEINTERN', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define Rule model
const RuleSchema = new mongoose.Schema({
    rule: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Rule = mongoose.model('Rule', RuleSchema);

// Function to evaluate a condition based on a rule string and data
const evaluate_condition = (rule, data) => {
    try {
        // Replace "if" and "then" for evaluation, and check using eval
        const condition = rule.replace(/if\s+/i, '').replace(/then.*/i, '');
        // Create a function scope for safe evaluation
        const func = new Function(...Object.keys(data), `return ${condition};`);
        return func(...Object.values(data));
    } catch (err) {
        console.error(`Error evaluating condition: ${err.message}`);
        return false; // Default to false if evaluation fails
    }
};

// Save a new rule
app.post('/api/rules', async (req, res) => {
    const { rule } = req.body;

    try {
        const newRule = new Rule({ rule });
        await newRule.save();
        res.json({ message: 'Rule saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save rule' });
    }
});

// Get all rules
app.get('/api/rules', async (req, res) => {
    try {
        const rules = await Rule.find();
        res.json(rules);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch rules' });
    }
});

// Evaluate a rule based on attributes
app.post('/api/evaluate', async (req, res) => {
    const { attributes } = req.body;

    try {
        const rules = await Rule.find();
        const results = rules.map(rule => {
            return {
                rule: rule.rule,
                result: evaluate_condition(rule.rule, attributes)
            };
        });

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Failed to evaluate rules' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
