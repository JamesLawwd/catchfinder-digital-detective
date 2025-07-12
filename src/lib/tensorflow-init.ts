import * as tf from '@tensorflow/tfjs';

export async function initializeTensorFlow() {
  try {
    // Set TensorFlow.js backend
    await tf.setBackend('webgl');
    console.log('TensorFlow.js backend set to:', tf.getBackend());
    
    // Enable memory management
    tf.engine().startScope();
    
    console.log('TensorFlow.js initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize TensorFlow.js:', error);
    return false;
  }
}

export function cleanupTensorFlow() {
  try {
    tf.engine().endScope();
    tf.engine().reset();
    console.log('TensorFlow.js memory cleaned up');
  } catch (error) {
    console.error('Error cleaning up TensorFlow.js:', error);
  }
} 