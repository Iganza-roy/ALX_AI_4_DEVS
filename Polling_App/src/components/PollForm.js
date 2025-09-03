import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createPoll } from '@/lib/actions';

export default function PollForm() {
  return (
    <form
      action={createPoll}
      className='mx-auto mt-10 max-w-lg space-y-6 rounded-lg border bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800'
    >
      <div>
        <label
          htmlFor='title'
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Poll Title
        </label>
        <Input
          type='text'
          id='title'
          name='title'
          required
          placeholder="What's your poll about?"
          className='mt-1'
        />
      </div>
      <div>
        <label
          htmlFor='option1'
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Option 1
        </label>
        <Input
          type='text'
          id='option1'
          name='option1'
          required
          placeholder='Enter the first option'
          className='mt-1'
        />
      </div>
      <div>
        <label
          htmlFor='option2'
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Option 2
        </label>
        <Input
          type='text'
          id='option2'
          name='option2'
          required
          placeholder='Enter the second option'
          className='mt-1'
        />
      </div>
      <div>
        <label
          htmlFor='image'
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Poll Image (Optional)
        </label>
        <Input
          type='file'
          id='image'
          name='image'
          accept='image/*'
          className='mt-1'
        />
      </div>
      <Button type='submit' className='w-full'>
        Create Poll
      </Button>
    </form>
  );
}
