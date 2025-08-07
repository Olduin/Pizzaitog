using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;

namespace PizzaSales.Domain.Logger
{
    public class FileLogger : ILogger
    {
        private string _filePath;
        private static object _lock = new object();
        public FileLogger(string filePath)
        {
            _filePath = filePath;
        }              

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
        {
            if (formatter != null)
            {
                lock (_lock)
                {                    
                    string datedFilePath = GetDatedFilePath();
                    string logRecord = $"{DateTime.Now:HH:mm:ss} [{logLevel}] {formatter(state, exception)}{Environment.NewLine}";
                    Directory.CreateDirectory(Path.GetDirectoryName(datedFilePath)!);
                    File.AppendAllText(datedFilePath, logRecord);
                }
            }
        }

        private string GetDatedFilePath()
        {
            string date = DateTime.Now.ToString("dd-MM-yyyy");
            string time = DateTime.Now.ToString("HH-mm-ss");
            string directory = Path.GetDirectoryName(_filePath)!;
            string fileName = Path.GetFileName(_filePath);

            string[] files = Directory.GetFiles(directory, $"{fileName}-{date}*.log");          
            //string[] files = null;

            if (files != null)
            {
                if (files.Length != 0)
                {
                    return files[0];
                }
            }            
            
            return Path.Combine(directory, $"{fileName}-{date}-{time}.log");
           
            //return files.Any(file => Path.GetFileName(file).Contains(date) );
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            //return logLevel == LogLevel.Trace;
            return true;
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }
    }
}
