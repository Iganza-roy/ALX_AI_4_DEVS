import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
// Poll creation form component placeholder
export default function PollForm() {
  return (
    <form className='space-y-4'>
      <div>
        <label
          htmlFor='title'
          className='block text-sm font-medium text-gray-700'
        >
          Poll Title
        </label>
        <Input type='text' id='title' name='title' required />
      </div>
      <div>
        <label
          htmlFor='option1'
          className='block text-sm font-medium text-gray-700'
        >
          Option 1
        </label>
        <Input type='text' id='option1' name='option1' required />
      </div>
      <div>
        <label
          htmlFor='option2'
          className='block text-sm font-medium text-gray-700'
        >
          Option 2
        </label>
        <Input type='text' id='option2' name='option2' required />
      </div>
      <div>
        <label
          htmlFor='image'
          className='block text-sm font-medium text-gray-700'
        >
          Poll Image (Optional)
        </label>
        <Input type='file' id='image' name='image' accept='image/*' />
      </div>
      <Button type='submit'>Create Poll</Button>
    </form>
  );
}
