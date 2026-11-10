import { Router } from 'express';
import quizService from '../services/quizService.js';

const router = Router();

/**
 * @desc    Submit quiz answers and get personalized tea recommendation
 * @route   POST /api/v1/quiz/recommend
 * @access  Public
 */
router.post('/recommend', async (req, res, next) => {
  try {
    const { answers } = req.body;
    const recommendation = await quizService.getTeaRecommendation(answers || req.body);

    res.status(200).json({
      success: true,
      data: recommendation
    });
  } catch (error) {
    next(error);
  }
});

export default router;

