import EventRenderMobile from './mobile/EventRenderMobile';
import _EventRender from './pc/EventRender';

type EventRenderP = typeof _EventRender;

interface EventRenderType extends EventRenderP {
  Mobile: typeof EventRenderMobile;
}

const EventRender = _EventRender as EventRenderType;

EventRender.Mobile = EventRenderMobile;

export default EventRender;
